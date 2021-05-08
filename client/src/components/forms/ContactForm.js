import React, { useState } from 'react'
import "./ContactForm.css"
import {Link} from 'react-router-dom'

const ContactForm=({name,setName,address,setAddress,mobile,setMobile,message,setMessage,cart,handleSubmit})=>{

    return (
        // <form onSubmit={handleSubmit} classNameName="form">
        //    <div classNameName="form-group">
        //        <label classNameName="label">Name</label>
        //        <input
        //         classNameName="input"
        //          placeholder="Name" 
        //          value={name} 
        //          onChange={(e)=>{
        //            setName(e.target.value)
        //        }} 
        //           />
        //    </div>
        //    <div classNameName="form-group">
               
        //        <label classNameName="label">Mobile No.</label>
        //        <input classNameName="input" placeholder="10 digit mobile number"
        //        value={mobile} 
        //        onChange={(e)=>{
        //            //validate mobile number
        //           setMobile(e.target.value)
        //      }}
        //       />
        //    </div>
        //    <div classNameName="form-group">
        //        <label classNameName="label">Address</label>
        //        <input classNameName="input" placeholder="Address"
        //        value={address} 
        //        onChange={(e)=>{
        //          setAddress(e.target.value)
        //      }}/>
        //    </div>
        //    <div classNameName="form-group">
        //        <label classNameName="label"> Cart</label>
        //        <div classNameName="cart-list">
        //        {cart.length?cart.map((p,i)=>{
        //            return <p key={i} classNameName="cart-empty">{p.title} x {p.count}</p>
        //        }):<div >
        //            <p classNameName='cart-empty'>Your Cart Is Empty.</p>
        //            <Link to="/">Continue Shopping.</Link>
        //            </div>}
        //        </div>

        //    </div>
        //    <div classNameName="form-group">
        //        <button  disabled={isNaN(mobile) || mobile.length>10 || mobile.length<10} classNameName="button">Submit</button>
        //    </div>
        // </form>


        <div className="container">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
           
  
            <div className="info">
              <div className="information">
                <p>Noida sec-3, Uttar Pradesh,India</p>
              </div>
              <div className="information">
                <p>bhawalelectronics@gmail.com</p>
              </div>
              <div className="information">
                <p>9878987676</p>
              </div>
              <div >
                <div style={{color:"#c3003c"}}>Cart</div>
               <div>
               {cart.length?cart.map((p,i)=>{
                    return <p key={i} classNameName="cart-empty">{p.title} x {p.count}</p>
               }):<div >
                   <p classNameName='cart-empty'>Your Cart Is Empty.</p>
                    <Link to="/">Continue Shopping.</Link>
                    </div>}
               </div>
              </div>
            </div>
          </div>
  
          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>
  
            <form onSubmit={handleSubmit} autoComplete="off">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input type="text"
                 name="name" 
                 className="input"
                 placeholder="Name"
                 value={name} 
                         onChange={(e)=>{
                            setName(e.target.value)
                        }} 
                 />
              </div>
              <div className="input-container">
                <input type="tel"
                 name="phone"
                  className="input" 
                  placeholder="10 digit mobile number" 
                  value={mobile} 
                        onChange={(e)=>{
                           //validate mobile number
                          setMobile(e.target.value)
                   }}
                  />
              </div>
              <div className="input-container">
                <input type="tel"
                 name="phone"
                  className="input" 
                  placeholder="Address" 
                  value={address} 
                        onChange={(e)=>{
                          setAddress(e.target.value)
                   }}
                  />
              </div>
              <div className="input-container textarea">
                <textarea name="message" 
                className="input"
                 placeholder="Message"
                 value={message}
                 onChange={(e)=>{
                   setMessage(e.target.value)
                 }}
                 ></textarea>
              </div>
              <input type="submit"  disabled={isNaN(mobile) || mobile.length>10 || mobile.length<10} className="btn" />
            </form>
          </div>
        </div>
      </div>
    )
}


export default ContactForm