import React from 'react'
import {Newslugify} from '../../functions/helper'


const MenuDisplayCard=({cat})=>{

return(
    <div style={{width:"300px",height:"400px",margin:"20px",padding:"25px 0",borderRadius:"10px",boxShadow:"0 0 2px black",background:"#C3003C"}}>
    <div style={{width:"300px",height:"300px",background:"white"}}>
           <img  style={{width:"250px",display:"block",margin:"auto",height:"100%"}} src={cat.image.url} />
    </div>
    <div style={{height:"50px",textAlign:"center"}}>
    <p style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",background:"#ccc"}}><span style={{background:"white",color:"black",display:"flex",justifyContent:"center",alignItems:"center",width:"30px",borderRadius:"10px"}}>{cat.total}</span></p>
    <p style={{background:"#c3003c"}}><a style={{color:"white",fontSize:"20px",textTransform:"uppercase"}} href={`/products/${Newslugify(cat.sub,{join:"-",case:"uppercase"} )}`}>{cat.sub}</a></p>
    </div>
</div>
)

}

export default MenuDisplayCard