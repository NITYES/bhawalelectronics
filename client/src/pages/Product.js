import React,{useEffect, useState} from 'react'
import {getProduct} from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import {useSelector} from 'react-redux';
import {productStar,getRelated} from '../functions/product'
import ProductCard from '../components/cards/ProductCard'


const Product=({match})=>{

const [product,setProduct]=useState([]);
const [star,setStar]=useState(0);
const[relatedproduct,setRelatedProduct]=useState()

//redux
const {user}=useSelector((state)=>({...state}))

const {slug}=match.params

useEffect(()=>{
    window.scroll(0,0)
    loadSingleProduct();

},[slug]);

useEffect(()=>{
    if(product.ratings&& user){
        let existingRatingObject=product.ratings.find((ele)=>ele.postedBy.toString()===user._id.toString() )
        existingRatingObject && setStar(existingRatingObject.star); //current user star
    }
})



const onStarClick = (newRating,name) => {
    setStar(newRating);
    productStar(name,newRating,user.token).then(res=>{
   loadSingleProduct();//if you want to show rating in real time

    }).catch(err=>{
        console.log(err)
    })
};

const loadSingleProduct=()=>{

    getProduct(slug).then(res=>{

setProduct(res.data);
//load related as well
getRelated(res.data._id).then(res=>setRelatedProduct(res.data));

    }).catch(err=>{
        console.log(err)
    })
}


  return(
      <div className="container-fluid marginheader" >
              <div className="row pt-4">
                 <SingleProduct  
                 product={product}
                  onStarClick={onStarClick} 
                  star={star}
                  />
              </div>

              <div className="row ">
                 <div className="col text-center p-3 m-2 " style={{background:"white",color:"#c3003c",border:"2px solid #c3003c",marginTop:"100px"}}>
                 Related products
                 </div>
                  
               </div>
               <div className="row pb-5 ">
               {relatedproduct&&relatedproduct.length ?
               relatedproduct.map((product)=>(
               <div className="col-md-4 mt-3" key={product._id}>
                 <ProductCard product={product} />
                   </div>)):(<div style={{textAlign:"center"}}>No product Found</div>)}       
               </div>
      </div>



  )

}


export default Product 