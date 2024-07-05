
const mongoose = require('mongoose');


let schema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  pimage: String,
  pimage2: String,
  addedBy: mongoose.Schema.Types.ObjectId,

})



const Products = mongoose.model('Products', schema);


module.exports.search = (req, res) => {


  let search = req.query.search;

  Products.find({
    $or: [
      { pname: { $regex: search } },
      { pdesc: { $regex: search } },
      { price: { $regex: search } },
    ]
  })

    .then((results) => {
      // console.log(result,"user data")
      res.send({ message: 'success', products: results })
    })
    .catch((err) => {
      res.send({ message: 'server error' })
    })
}

module.exports.addProduct = (req, res) => {

  // console.log(req.body);
  // console.log(req.file.path);
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const pimage = req.files.pimage[0].path;
  const pimage2 = req.files.pimage2[0].path;
  const addedBy = req.body.userId;


  const product = new Products({ pname, pdesc, price, category, pimage, pimage2, addedBy });
  product.save()
    .then(() => {
      res.send({ message: 'saved successfully' })
    })
    .catch(() => {
      res.send({ message: 'server error' })
    })


}


module.exports.getProducts = (req, res) => {

  const catName = req.query.catName;
  let _f = {}

  if (catName) {
    _f = { category: catName }
  }

  Products.find(_f)
    .then((result) => {
      res.send({ message: 'success', products: result })

    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })
}

module.exports.getProductsById = (req, res) => {
  console.log(req.params);
  Products.findOne({ _id: req.params.pId })
    .then((result) => {
      // console.log(result,"user data")
      res.send({ message: 'success', product: result })
    })
    .catch((err) => {
      res.send({ message: 'server error' })
    })

}

module.exports.myProducts = (req, res) => {

  const userId = req.body.userId;

  Products.find({ addedBy: userId })
    .then((result) => {
      res.send({ message: 'success', products: result })
    })
    .catch((err) => {
      res.send({ message: 'server err' })
    })

}

module.exports.deleteProduct = (req, res) => {
  Products.findOne({ _id: req.body.pid })
    .then((result) => {
      if (result.addedBy.toString() === req.body.userId) {
        Products.deleteOne({ _id: req.body.pid })
          .then((deleteResult) => {
            if (deleteResult.acknowledged) {
              res.send({ message: 'success' });
            } else {
              res.send({ message: 'deletion failed' });
            }
          })
          .catch((err) => {
            res.send({ message: 'server error', error: err });
          });
      } else {
        res.send({ message: 'unauthorized action' });
      }
    })
    .catch((err) => {
      res.send({ message: 'server error', error: err });
    });
}
