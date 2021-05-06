import React from 'react';
import {Link} from 'react-router-dom';

const ProductListItems =({product})=>{
let detail=[]
    const {price,shipping,color,quantity,sold}=product

if(product.details){
       
    detail=product.details.split('/');

}

    return (
        <ul className="list-group">
         <li  className="list-group-item">
            <span style={{color:"black",fontSize:"18px"}}> Price{" "}</span>
                 <span className="label label-default label-pill pull-xs-right" style={{color:"#c3003c",fontSize:"20px"}} >
                     RS.{price} 
                 </span>
         </li>
                 
         <li className="list-group-item">
                 <span style={{color:"black",fontSize:"18px"}}>Shipping{" "}</span>
                 <span className="label label-default label-pill pull-xs-right" style={{color:"#c3003c",fontSize:"20px"}}>
                     {shipping}
                 </span>
         </li>
         <li className="list-group-item">
         <span style={{color:"black",fontSize:"18px"}}>Color{" "}</span>
                 <span className="label label-default label-pill pull-xs-right" style={{color:`${color}`,fontSize:"20px"}} >
                     {color}
                 </span>
         </li>
         <li className="list-group-item">
         <span style={{color:"black",fontSize:"18px"}}>Availability{" "}</span>
                 <span className="label label-default label-pill pull-xs-right" style={{color:"#c3003c",fontSize:"20px"}}>
                     {quantity}
                 </span>
         </li>
         <li className="list-group-item" >
             <div style={{fontSize:"20px",display:"block",width:"100%",padding:"10px",color:"#c3003c"}}  >Details</div>
             <ul >
                 {
                     detail.length>0&&detail.map((d)=><li style={{listStyle:"dot",padding:"5px"}}>{d}</li>)
                 }
             </ul>
         </li>
         {/* <li className="list-group-item">
                 Sold{" "}
                 <span className="label label-default label-pill pull-xs-right">
                     {sold}
                 </span>
         </li> */}
        </ul>
    )
}

export default ProductListItems