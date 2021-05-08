import React, { useEffect, useState } from 'react';
import {loadMenu} from '../../functions/menu'
import "./menu.css"
import tv from '../../images/lg-washing-1.png'
import { Link } from 'react-router-dom';
const Menubar=()=>{

const[menu,setMenu]=useState([]);

useEffect(()=>{

    loadMenu().then(res=>{
        setMenu(res.data);
        localStorage.setItem("menu",JSON.stringify(res.data))
    
    })


},[])


    return (
        <div className="menu">
            <ul className="menu-container">
            {menu.map((menuitem)=>{
                return <li className="menu-item"><h6>{menuitem.name}</h6>
                         <ul className="menu-item-block"> <div className="sub-container">

                         {menuitem.subCategory.length >0&&
                                  menuitem.subCategory.map((submenu,i)=>{
                                     return <ul key={i} className="sub"><a href={`/products/${submenu.slug}`} className="sub-heading">{submenu.name}</a>
                                                {submenu.item.length>0&&
                                                  submenu.item.map((item,i)=>{
                                                      return <li key={i} className="item"><a href={`/products/${item.slug}`}>{item.name}</a></li>
                                                  })

                                                }    
                                     
                                     </ul>
                                  })
                                  
                          }
                         </div>
                          
                          <div className="image-container">
                              <img className="img" src={tv}></img>
                          </div>
                          </ul>
                         
                     
                </li>
            })}
            <Link to="/contact">
            <li className="menu-item contact-link"><h6>Contact Us</h6></li>
            </Link>
            </ul>
        </div>
    )
}


export default Menubar