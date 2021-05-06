import React,{useState} from "react";
import { Card ,Tabs,Tooltip,Breadcrumb} from "antd";
import { Link } from "react-router-dom";
import  StarRating from "react-star-ratings";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/laptop.png";
import ProductListItems from './ProductListItems';
import RatingModal from '../modal/RatingModal';
import {showAverage} from '../../functions/rating';
import _ from 'lodash';
import {useSelector,useDispatch} from 'react-redux'
import {slugify} from '../../functions/helper'
import Carousels from "../home/Carousel";



const { Meta } = Card;
const {TabPane}=Tabs

const SingleProduct = ({ product,onStarClick ,star}) => {
  const { title, images ,description,_id,category,subs,item} = product;
  const[tooltip,setTooltip]=useState('Click to Add');

//redux
const{user,cart}=useSelector((state)=>({...state}));
const dispatch=useDispatch();

//handle add to cart function on click to add the cart
  const handleAddToCart=()=>{
    //show tooltip
    //create cart array

  let cart=[];
  if(typeof window!=="undefined"){
    //if cart is in localstorage GET it
     if(localStorage.getItem('cart')){
       cart=JSON.parse(localStorage.getItem('cart'));
     }
     //push new product to cart
     cart.push({...product,
        count:1, 
      })
    //remove duplicate
  let unique=_.uniqWith(cart,_.isEqual);
      //save to localstorage
  console.log(unique);
  console.log(cart)
  localStorage.setItem('cart',JSON.stringify(unique));
  
  setTooltip('Added');
  //add to redux stsate
  dispatch({
    type:"ADD_TO_CART",
    payload:unique
  })
  
  }
  
  }


  return (
    <>
      <div className="col-md-7">

        {images && images.length ? (
          <Carousel>
            {images.map(img=>{
            return  <div style={{background:"white",display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
              <div style={{width:"500px",height:"500px"}} ><img style={{width:"100%",height:"100%",display:"block"}} src={img.url} /></div>
            </div>
            })}
          </Carousel>
        ) : (
          <Card cover={<img src={laptop} className="mb-3" />} />
        )}

<Tabs type='card' style={{marginBottom:"50px"}}>
          <TabPane tab="Description" key='1'>
                     {description&& description}
          </TabPane>
          <TabPane tab="More" key='2'>
              Call us on 9870976876 to learn more about this product.
          </TabPane>
      </Tabs>
      </div>
      
           {product&&product.category&& <div className="col-md-5">
           <h3 className=" p-3" style={{background:"#c3003c", color:"white"}} >{slugify(title,{case:"uppercase",join:" "})}</h3>
       <Breadcrumb>
    <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href={`/products/${slugify(category,{join:"-"} )}`}>{slugify(category,{case:"uppercase",join:" "})}</a>
    </Breadcrumb.Item>
    <Breadcrumb.Item>
    <a href={`/products/${slugify(subs,{join:"-"})}`}>{slugify(subs,{case:"uppercase",join:" "})}</a>

      </Breadcrumb.Item>
    <Breadcrumb.Item>
    <a href={`/products/${slugify(item,{join:"-"})}`}>{slugify(item,{case:"uppercase",join:" "})}</a>

      </Breadcrumb.Item>
    <Breadcrumb.Item>{slugify(title,{case:"uppercase",join:" "})}</Breadcrumb.Item>
  </Breadcrumb>  
        
     {product && product.ratings && product.ratings.length > 0 ? showAverage(product):
     (<div className="text-center pt-1 pb-3">No rating Yet</div>)}
        <Card
          actions={[
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
            <ShoppingCartOutlined   className='text-warning'/><br/>Add to Cart
          </a>
        </Tooltip>,
            <Link to="/">
              <HeartOutlined  style={{color:"#c3003c"}}/> <br />
              Add to wish list
            </Link>,
              <RatingModal>
              <StarRating
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="red"    
               />
              </RatingModal>
          ]}
        >

       <ProductListItems product={product} />
        </Card>
             </div>}
          
    </>
  );
};

export default SingleProduct;
