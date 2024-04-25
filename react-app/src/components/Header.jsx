
import {Link} from 'react-router-dom';
import './Header.css'


function Header(){
    return(
        <div className="header">
                   <Link to="/">HomePage</Link>

           <span className="mt-3">This is Header filesghfmghj</span> 
       <Link to="/login">LOGIN</Link>
        </div>
    )
}

export default Header;