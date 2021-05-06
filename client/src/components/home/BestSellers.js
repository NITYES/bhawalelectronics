import React, { useState, useEffect } from "react";
import { getProducts,getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from '../cards/LoadingCard';



function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productCount,setProductCount]=useState(0);

  useEffect(() => {
    loadAllProduct();
  }, []);


  const loadAllProduct = () => {
    setLoading(true);
    //sort, order, limit
    getProducts('sold','desc',1)
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

{ loading ?(<LoadingCard count={3}/>): (  <div  className="row "  style={{margin:"auto",padding:"0",justifyContent:"space-evenly",alignItems:"flex-start"}} >
       {products.map((product)=>(
     <div key={product._id} className="  col-xs-12 col-sm-12  col-lg-6 col-xl-4 col-md-6"  >
           <ProductCard product={product}/>
      </div>
      
      ))}
   </div>) }

</div>
</>

  );
}

export default BestSellers;
