import React, { useState } from 'react'
import {Carousel} from 'antd'
import slider1 from '../../images/slider1.jpg'
import slider2 from '../../images/slider2.jpg'
import slider3 from '../../images/slider3.jpg'

import './carousel.css'


const Carousels=({images})=>{
    let image;
    if(images&&images.length > 0){
        image=images
    }else{
        image=[{public_id:1,url:slider1},{public_id:2,url:slider2},{public_id:3,url:slider3}]
 }
    return (
           <div className="slide"  >
               <figure id="figure" className="figure">

     {
         image.map(img=><img key={img.public_id} id="img" className="images" src={img.url}></img>)
     }

 </figure>
                    

           </div>
          


    )
}

export default Carousels