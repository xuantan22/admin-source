/* eslint-disable no-unused-vars */
import React from 'react'
import './Admin.css'
import { Routes, Route } from 'react-router-dom'
import AddProduct from '../../AddProduct/AddProduct'
import ListProduct from '../../ListProduct/ListProduct'
import ListUsers from '../../ListUsers/ListUsers'
import SideBar from '../../Sidebar/Sidebar'
import ProductEdit from '../ProductEdit/ProductEdit'
const Admin = () => {
  return (
    <div className='admin'>
      <SideBar />
      <Routes>
        <Route path='/addproducts' element={<AddProduct />} />
        <Route path='/getallproducts' element={<ListProduct />} />

        <Route path='/getallusers' element={<ListUsers />} />
        <Route path='/productupdate' element={<ProductEdit />}>
            <Route path=':productId' element={<ProductEdit />} />
        </Route>

      </Routes>
    </div>
  )
}

export default Admin