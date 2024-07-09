/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import edit_icon from '../../assets/edit-246.png'
import remove_icon from '../../assets/cross_icon.png'
import { API_BASE_URL } from '../../../../commerce-frontend/src/Api'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchDB = async () => {
    await fetch(`${API_BASE_URL}/getallproducts`)
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }
  useEffect(() => {
    fetchDB();
  }, [])

  const removeProduct = async (id) => {
    await fetch(`${API_BASE_URL}/removeproduct`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchDB();
  }
  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Category</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Edit</p>
        <p>Move</p>
      </div>
      <div className='listproduct-allproducts '>
        <hr />
        {allproducts.map((product, key) => {
          return <div key={key} className='listproduct-format-main listproduct-format'>
            <p><img src={product.image} className='listproduct-product-icon' /></p>
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <a href={`/productupdate/${product.id}`}><img className='listproduct-edit-icon' src={edit_icon} alt='icon'  /></a>
            <img src={remove_icon} alt="" className='listproduct-remove-icon' onClick={() => { removeProduct(product.id) }} />
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct
