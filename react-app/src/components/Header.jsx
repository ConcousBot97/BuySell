
import {Link, useNavigate} from 'react-router-dom';
import './Header.css'


function Header(){

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
       
        navigate('/login');
    }

    return(
        <div className="header">
                   <Link to="/">HomePage</Link>

           <span className="mt-3">This is Header</span> 

       { !localStorage.getItem('token') ?
        <Link to="/login">LOGIN</Link> :
        <button onClick={handleLogout}>LOGOUT</button> }
        </div>
    )
}

export default Header;