
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import './Home.css';
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
function Header(props) {

    const [showOver, setshowOver] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    return (
        <div className='header-container d-flex justify-content-between'>
            <div className="header">
                <Link className='links' to="/">HomePage</Link>


                <input className='search' type='text' value={props && props.search}
                    onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > <FaSearch /> </button>


            </div>

            <div>
                <div
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#002f34',
                        width: '40px',
                        height: '40px',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '50%'
                    }}> N </div>

                {showOver && <div style={{
                    minHeight : '100px',
                    width: '200px',
                    background: '#002f34',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: '1',
                    marginTop: '60px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    borderRadius: '7px'
                }}>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/add-product">
                                <button className='logout-btn'>ADD PRODUCT</button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className='logout-btn'>LIKED PRODUCTS</button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login">LOGIN</Link> :
                            <button className='logout-btn' onClick={handleLogout}>LOGOUT</button>}
                    </div>
                </div>
                }
            </div>

        </div>
    )
}

export default Header;