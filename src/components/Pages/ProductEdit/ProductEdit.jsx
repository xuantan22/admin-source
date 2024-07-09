/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import upload_area from '../../../assets/upload_area.svg'
import './ProductEdit.css'
import { API_BASE_URL } from '../../../../commerce-frontend/src/Api'
const ProductEdit = () => {
    const { productId } = useParams();
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const fetchDB = async () => {
        await fetch(`${API_BASE_URL}/getproduct/${productId}`)
            .then((res) => res.json())
            .then((data) => { setProductDetails(data) });
    };

    useEffect(() => {
        fetchDB();
    }, [productId]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const updateProduct = async () => {
        let responseData;
        let product = productDetails;

        if (image) {
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
                console.log(" image upload success")
            } else {
                console.log("Image upload failed");
                return;
            }
        }

        await fetch(`${API_BASE_URL}/productupdate/${productId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((res) => res.json()).then((data) => {
            data.success ? alert('Product updated') : alert('Update failed');
        });
    };

    return (
        <div className='editproduct'>
            <div className='editproduct-itemfield'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className='editproduct-price'>
                <div className='editproduct-itemfield'>
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                </div>
                <div className='editproduct-itemfield'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className='editproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='editproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className='editproduct-itemfield'>
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) :  productDetails.image || upload_area} alt="" className='editproduct-thumbnail-img' />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={updateProduct} className='editproduct-btn'>UPDATE</button>
        </div>
    )
}

export default ProductEdit;
