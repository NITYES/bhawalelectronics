import React, { useEffect, useState } from 'react'
import { getCategoryCount } from '../../functions/product'
import MenuDisplayCard from '../cards/MenuDisplayCard';
import home from '../../images/lg-dish-1.jpg'
import tv from '../../images/lg-tv-2.jpg'
import mobile from '../../images/lg-mobile.jpg'

const ShowCategoryCount=()=>{
    const[images,setImages]=useState([home,tv,mobile]);
const[category,setCategory]=useState([]);
const[loading,setLoading]=useState(false)
useEffect(()=>{
    setLoading(true)
    getCategoryCount().then(res=>{
        setCategory(res.data);
        localStorage.setItem('subs',JSON.stringify(res.data))
        setLoading(false)
    }).catch((err)=>{
        setLoading(false);
    })
},[])

    return(
        <div style={{width:"100%",height:"auto",marginBottom:"50px"}}>
                  {loading?<div>...loading</div>:<div>
                      
                          {category&&<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
                              {
                                 category.map(cat=><MenuDisplayCard cat={cat} />)
                              }
                              </div>}

                      </div>}
        </div>
    )

}

export default ShowCategoryCount