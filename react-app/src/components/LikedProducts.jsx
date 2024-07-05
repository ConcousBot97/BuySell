import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories";
import './Home.css';
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";
function LikedProducts() {
    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);
    
    
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])



    useEffect(() => {
        const url = API_URL+'/liked-products';
       let data={userId: localStorage.getItem('userId')}
        axios.post(url,data)
            .then((res) => {
               
                if (res.data.products) {
                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
              
                alert('Server error')
            })
    }, [])


    const handlesearch = (value) => {
        setsearch(value);
    }

    const handleClick = () => {

        // const url = 'http://localhost:4000/search?search=' + search ;
        // axios.get(url)
        //     .then((res) => {
        //         setcproducts(res.data.products);
        //         setissearch(true);
        //     })
        //     .catch((err) => {
        //         alert('Server Err.')
        //     })  
        

       
        let filteredProducts = products.filter((item) => {
               if(item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())){
                return item;
               }
        })
        setcproducts(filteredProducts)

        }

        const handleCategory = (value) => {
            let filteredProducts = products.filter((item, index) => {
                if (item.category == value) {
                    return item;
                }
            })
            setcproducts(filteredProducts)
        }

        const handleLike=(productId)=>{
            let userId=localStorage.getItem('userId');
            const url = API_URL+'/like-product';
            const data={userId,productId}
            axios.post(url,data)
            .then((res) => {
               
                console.log(res);
                if(res.data.message){
                    alert('Liked success')
                }
            })
            .catch((err) => {
              
                alert('Server error')
            })
        }


    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

        
            <div className="d-flex justify-content-center flex-wrap">
            {cproducts && products.length > 0 &&
                cproducts.map((item, index) => {
                    return (
                        <div key={item._id} className="card m-3">
                            <div onClick={()=>handleLike(item._id)} className="icon-con">
                                    <FaHeart className="icons" />
                                </div>
                            <img width="300px" height="200px" src={API_URL+'/'+item.pimage}  />
                            <p className="m-2"> {item.pname} | {item.category} </p>
                            <h3 className="m-2 text-danger"> {item.price}</h3>
                            <p className="m-2 text-success"> {item.pdesc}</p>
                        </div>
                    )
                })}
                </div>

                <h5>ALL RESULTS</h5>


            <h2>MY PRODUCTS : </h2>
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length > 0 &&
                products.map((item, index) => {
                    return (
                        <div key={item._id} className="card m-3">
                            <div onClick={()=>handleLike(item._id)} className="icon-con">
                                    <FaHeart className='red-icons' />
                                </div>
                            <img width="300px" height="200px" src={API_URL+'/'+item.pimage}  />
                            <p className="m-2"> {item.pname} | {item.category} </p>
                            <h3 className="m-2 text-danger"> {item.price}</h3>
                            <p className="m-2 text-success"> {item.pdesc}</p>
                        </div>
                    )
                })}
                </div>

               
        </div>
    )

}

export default LikedProducts;