/* eslint-disable no-unused-vars */
import React from 'react'
import './Sidebar.css'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <p>Quan Ly User</p>
            <Link to={'/getallusers'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={add_product_icon} alt="" />
                    <p>All User</p>
                </div>
            </Link>
            <p>Quan Ly San Pham</p>
            <Link to={'/addproducts'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={add_product_icon} alt="" />
                    <p>Add product</p>
                </div>
            </Link>
            <Link to={'/getallproducts'} style={{ textDecoration: "none" }}>
                <div className='sidebar-item'>
                    <img src={list_product_icon} alt="" />
                    <p>All product</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar