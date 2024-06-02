/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'
const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);

  const fetchDB= async() => {
    await fetch("https://commerce-backend-154x.onrender.com/getallproducts")
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }
  useEffect(()=>{
    fetchDB ();
  },[])

  const removeProduct = async (id) => {
    await fetch("https://commerce-backend-154x.onrender.com/removeproduct",{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
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
        <p>Move</p>
      </div>
      <div className='listproduct-allproducts '>
      <hr/>
        {allproducts.map((product, key)=>{
          return <div key={key} className='listproduct-format-main listproduct-format'>
                  <p><img src={product.image} className='listproduct-product-icon'/></p>
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>${product.old_price}</p>
                  <p>${product.new_price}</p>
                  <img src={remove_icon} alt="" className='listproduct-remove-icon' onClick={()=>{removeProduct(product.id)}}/>
                </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct
