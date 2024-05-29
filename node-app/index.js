
const express = require('express')
const cors = require('cors')
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = 4000
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://puruyadav2003:puneet123@buysell.n0yey40.mongodb.net/?retryWrites=true&w=majority&appName=buysell');

const Users = mongoose.model('Users', { username: String , password: String});

app.get('/', (req, res) => {
  res.send('Hello World! gjfdfjlv.kdfsgbjfskg fgkmg')
})

app.post('/signup', (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
  console.log(req.body)

  const user = new Users({ username: username , password: password });
  user.save()
  .then(() => {
        res.send({message : 'saved successfully'})
  })
  .catch(() => {
    res.send({message : 'server error'})
  })
  
})

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({ username: username })
  .then((result) => {
      if (!result) {
          res.send({ message: 'user not found.' })
      } else {
          if (result.password == password) {
            const token = jwt.sign({
              data: result
          }, 'MYKEY', { expiresIn: '1h' });
          res.send({ message: 'find success.', token: token, userId: result._id })
          }
          if (result.password != password) {
              res.send({ message: 'password wrong.' })
          }

      }

  })
  .catch(() => {
      res.send({ message: 'server err' })
  })
 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})