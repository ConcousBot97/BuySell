import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Header from "./Header";


function ProductDetail(){
    const [product , setproduct] = useState()

    const p=useParams()
    console.log(p.productId)

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
               console.log(res)
               if(res.data.product){
                setproduct(res.data.product)
               }
            })
            .catch((err) => {
              
                alert('Server error')
            })
    }, [])


    return (
        <div>
            <Header/>
        PRODUCTS DETAILS :  
       { product && <div>
            <div>
            <img width="700px" height="300px" src={'http://localhost:4000/'+product.pimage} alt="" />
           <h6>PRODUCT DETAILS : </h6>
            {product.pdesc}
            </div>
            <div>
            {product.pname}
            </div>
        </div>}
        </div>
    )
}
export default ProductDetail;