import React, { useState } from 'react'
import './ContactForm.css'
import {Link} from 'react-router-dom'
import { isNumber } from 'lodash'

const ContactForm=({name,setName,address,setAddress,mobile,setMobile,cart,handleSubmit})=>{

const[error,setError]=useState(false)
    return (
        <form onSubmit={handleSubmit} className="form">
           <div className="form-group">
               <label className="label">Name</label>
               <input
                className="input"
                 placeholder="Name" 
                 value={name} 
                 onChange={(e)=>{
                   setName(e.target.value)
               }} />
           </div>
           <div className="form-group">
               {
                   error?<p className="error">please enter 10 digit mobile number.</p>:""
               }
               <label className="label">Mobile No.</label>
               <input className="input" placeholder="10 digit mobile number"
               value={mobile} 
               onChange={(e)=>{
                   //validate mobile number
                  setMobile(e.target.value)
             }}/>
           </div>
           <div className="form-group">
               <label className="label">Address</label>
               <input className="input" placeholder="Address"
               value={address} 
               onChange={(e)=>{
                 setAddress(e.target.value)
             }}/>
           </div>
           <div className="form-group">
               <label className="label"> Cart</label>
               <div className="cart-list">
               {cart.length?cart.map((p,i)=>{
                   return <p key={i} className="cart-empty">{p.title} x {p.count}</p>
               }):<div >
                   <p className='cart-empty'>Your Cart Is Empty.</p>
                   <Link to="/">Continue Shopping.</Link>
                   </div>}
               </div>

           </div>
           <div className="form-group">
               <button  disabled={isNaN(mobile) || mobile.length>10 || mobile.length<10} className="button">Submit</button>
           </div>
        </form>
    )
}


export default ContactForm