import React, { useEffect, useState } from 'react';
import  './footer.css';
import {getCategoryCount} from '../../functions/product'
import {Newslugify} from '../../functions/helper'



const Footer=()=>{
    
const[subs,setSub]=useState([]);



useEffect(()=>{
   if(localStorage.getItem('subs')){
       const sub=localStorage.getItem('subs');
       setSub(JSON.parse(sub))
   }else{
    getCategoryCount().then(res=>{
        setSub(res.data);
    }).catch((err)=>{
    })
   }

},[])

return (

    <>
    <div className="footer-container">
        <div className="footer-content">
                   <div className="footer-item shop">
                          <p>SHOP BY CATEGORY</p>
                          <div>
                              {subs.map(s=>{
                                  return <a  href={`/products/${Newslugify(s.sub,{join:"-"} )}`}><span style={{textTransform:"uppercase"}}>{s.sub}</span></a>

                              })}
                          </div>
                   </div>
                   <div className="footer-item follow-contact">
                             <div className="follow">
                                     <p>FOLLOW US</p>
                                     <div className="social-icons">
                                     <i class="fab fa-facebook"></i>
                                     <i class="fab fa-instagram-square"></i>
                                     <i class="fab fa-twitter-square"></i>
                                     <i class="fab fa-linkedin"></i>
                                     </div>
                             </div>
                             <div className="contact-container">
                                 <p>CONTACT US</p>
                                 <div className="contact">
                                 <p>Email: bhawalelectronics@gmail.com</p>
                                 <p>Mobile:<span>9878998789</span></p>
                                 <p>Address: Noida sec-3 ,Uttar Praadesh,India</p>
                                 </div>
                             </div>

                       </div>
                       <div className="footer-item news-settler">
                           <p>SUBSCRIBE NEWSETTLER</p>
                             <div className="input">
                             <input placeholder="Enter email">
                             </input>
                             <button>Subscribe</button>
                             </div>
                       </div>
        </div>
        {/* <div className="footer-content map">
               <iframe style={{width:"100%",height:"100%"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7252521436612!2d77.3175661!3d28.5780119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45b03df3a13%3A0xaeba1ce26aa125fc!2sNoida%20Sec.16%20Metro%20Station!5e0!3m2!1sen!2sin!4v1619200285725!5m2!1sen!2sin"   loading="lazy"></iframe>
        </div> */}
    </div>
    </>
)

}


export default Footer;