/* eslint-disable no-unused-vars */
import React from 'react'
import './Admin.css'
import Sidebar from '../../Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../AddProduct/AddProduct'
import ListProduct from '../../ListProduct/ListProduct'
import ListUsers from '../../ListUsers/ListUsers'
const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproducts' element={<AddProduct/>}/>
            <Route path='/getallproducts' element={<ListProduct/>}/>

            <Route path='/getallusers' element={<ListUsers/>}/>

        </Routes>
    </div>
  )
}

export default Admin