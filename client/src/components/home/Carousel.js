import React, { useState } from 'react'
import slider1 from '../../images/image8.png'
import slider2 from '../../images/image9.png'
import slider3 from '../../images/image10.png'

import './carousel.css'


const Carousels=({images})=>{
    let image;
    if(images&&images.length > 0){
        image=images
    }else{
        image=[{public_id:1,url:slider1},{public_id:2,url:slider2},{public_id:3,url:slider3}]
 }
    return (
           <div className="slides"  >
               <figure  className="figures">

     {
         image.map(img=><img key={img.public_id}  id="imagess" src={img.url}></img>)
     }

 </figure>
                    

           </div>
          


    )
}

export default Carousels