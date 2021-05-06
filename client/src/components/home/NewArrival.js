import React, { useState, useEffect } from "react";
import { getProducts,getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from '../cards/LoadingCard';
import {Pagination} from 'antd';



function NewArrival() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadAllProduct(); 

  }, []);




  const loadAllProduct = () => {

    setLoading(true);
    //sort, order, limit
    getProducts('createdAt','desc',1)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error occured");
      });

  };

  return (
    <>

<div className='container' style={{margin:"auto",padding:"0"}}>

{ loading ?(<LoadingCard count={3}/>): (  <div  className="row" style={{margin:"auto",padding:"0",justifyContent:"space-evenly",alignItems:"flex-start"}} >
       {products.map((product)=>(
     <div key={product._id} className="col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-4 "  >
           <ProductCard product={product}/>
      </div>
      
      ))}
   </div>) }

</div>

</>

  );
}

export default NewArrival;
