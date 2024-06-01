import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories";

function Home() {
    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [issearch, setissearch] = useState(false);
    
    
    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login')
    //     }
    // }, [])



    useEffect(() => {
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
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
        setproducts(filteredProducts)

        }

        const handleCategory = (value) => {
            let filteredProducts = products.filter((item, index) => {
                if (item.category == value) {
                    return item;
                }
            })
            setproducts(filteredProducts)
        }

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            {!!localStorage.getItem('token') && <Link to="/add-product"> ADD PRODUCT </Link>}

            <h2>MY PRODUCTS : </h2>
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length > 0 &&
                products.map((item, index) => {
                    return (
                        <div key={item._id} className="card m-3">
                            <img width="300px" height="200px" src={'http://localhost:4000/'+item.pimage}  />
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

export default Home;