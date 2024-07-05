import { useEffect, useState } from "react";
import Header from "./Header";
import categories from "./CategoriesList";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../constants";

function EditProduct() {
    const p = useParams()
    const navigate = useNavigate();
    const [pname, setpname] = useState('');
    const [pdesc, setpdesc] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [pimage, setpimage] = useState(null);
    const [pimage2, setpimage2] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    let product = res.data.product;
                    setpname(product.pname)
                    setpdesc(product.pdesc)
                    setprice(product.price)
                    setcategory(product.category)
                    setpimage(product.pimage)
                    setpimage2(product.pimage2)
                }
            })
            .catch((err) => {

                alert('Server error')
            })
    }, [])

    const handleApi = () => {
        if (!pname || !pdesc || !price || !category || !pimage || !pimage2) {
            alert("Please fill in all fields and upload both images.");
            return;
        }

        const formData = new FormData();
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pimage', pimage);
        formData.append('pimage2', pimage2);
        formData.append('userId', localStorage.getItem('userId'));

        const url = API_URL + '/add-product';
        axios.post(url, formData)
            .then((res) => {
                console.log(res);
                if (res.data.message) {
                    alert(res.data.message);
                    navigate('/');
                }
            })
            .catch((err) => {
                alert('Server error');
            });
    }

    return (
        <div>
            <Header />
            <div className="p-3">
                <h2>EDIT PRODUCT HERE</h2>
                <label>Product Name</label>
                <input
                    className="form-control"
                    type="text"
                    value={pname}
                    onChange={(e) => { setpname(e.target.value) }}
                />
                <label>Product Description</label>
                <input
                    className="form-control"
                    type="text"
                    value={pdesc}
                    onChange={(e) => { setpdesc(e.target.value) }}
                />
                <label>Product Price</label>
                <input
                    className="form-control"
                    type="text"
                    value={price}
                    onChange={(e) => { setprice(e.target.value) }}
                />
                <label>Product Category</label>
                <select
                    className="form-control"
                    value={category}
                    onChange={(e) => { setcategory(e.target.value) }}
                >
                    <option value="" disabled>Select Category</option>
                    {categories && categories.length > 0 && categories.map((item, index) => (
                        <option key={'option' + index} value={item}>{item}</option>
                    ))}
                </select>
                <label>Product Image</label>
                <input style={{ width: '50%' }}
                    className="form-control"
                    type="file"
                    onChange={(e) => { setpimage(e.target.files[0]) }}
                />
                <img src={API_URL + '/' + pimage} width={100} height={50} /> <br />
                <label>Product Second Image</label>
                <input style={{ width: '50%' }}
                    className="form-control"
                    type="file"
                    onChange={(e) => { setpimage2(e.target.files[0]) }}
                />
                <img src={API_URL + '/' + pimage2} width={100} height={50} /> <br />
                <button onClick={handleApi} className="btn btn-primary mt-3">SUBMIT</button>
            </div>
        </div>
    );
}

export default EditProduct;
