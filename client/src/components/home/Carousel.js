import React, { useEffect, useState } from 'react';
import {getSlider} from '../../functions/slider'
import slider1 from '../../images/image8.png'
import slider2 from '../../images/image9.png'
import slider3 from '../../images/image10.png'


import './carousel.css'


const Carousels=({images})=>{
  const[image,setImage]=useState([])

useEffect(()=>{
      if(sessionStorage.getItem('carousel_image')){
                setImage(JSON.parse(sessionStorage.getItem('carousel_image')))
      }else{
        getSlider().then(res=>{
            setImage(res.data);
            sessionStorage.setItem('carousel_image',JSON.stringify(res.data))
        })   
      }
},[])

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