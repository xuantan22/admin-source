/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { API_BASE_URL } from '../../config';
const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })
    const imageHandler = (e) => {
        console.log(productDetails);
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
    const addProduct = async () => {
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data });

        if (responseData.success) {
            product.image = responseData.image_url;
            await fetch(`${API_BASE_URL}/addproduct`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert('product added') : alert('Failed')
            })
        } else {
            console.log("Image is not exist");
        }
    }
    console.log(image);
    return (
        <div className='addproduct'>
            <div className='addproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfield'>
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                </div>
                <div className='addproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addproduct-thumnail-img' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={addProduct} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
