/* eslint-disable no-unused-vars */
import React from 'react'
import './ListUsers.css'
import remove_icon from '../../assets/cross_icon.png'
import { useState } from 'react'
import { useEffect } from 'react'

const ListUsers = () => {
    const [allUsers,setAllUsers] = useState([]);
    const fetchDB =async() =>{
        await fetch("https://commerce-backend-154x.onrender.com/getallusers")
        .then((res)=>res.json())
        .then((data)=>{setAllUsers(data)});
 }

 useEffect(() =>{
    fetchDB();
 },[])

 const removeUser = async (id) => {
    await fetch("https://commerce-backend-154x.onrender.com/removeuser",{
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
    <div className='listusers'>
        <div className='listusers-format-main'>
            <p>UserName</p>
            <p>Email</p>
            <p>Remove</p>
        </div>
        <div className='listusers-allusers'>
            {allUsers.map((user, key) =>{
                return  <div key={key} className='listusers-format-main listusers-format'>
                            <p>{user.name}</p>
                            <p>{user.email}</p>
                            <img className="listusers-romove-icon" src={remove_icon} alt='' onClick={()=>removeUser(user._id)} />
                        </div>
                   
            })}
        </div>
    </div>
  )
}

export default ListUsers
