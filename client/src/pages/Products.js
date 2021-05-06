import React, { useState, useEffect } from "react";
import {
  fetchProductsByFilter,
} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider ,Checkbox,Radio,Pagination} from "antd";
import { BgColorsOutlined, DollarOutlined,StarOutlined} from "@ant-design/icons";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import {getProductsCountWithFilter} from '../functions/product'
import Star from '../components/forms/Star';
import './products.css'
import LoadingCard from "../components/cards/LoadingCard";



const { SubMenu, ItemGroup } = Menu;
const Products = ({match}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [star,setStar]=useState(0);
  const [subs,setSubs]=useState([]);
  const [sub,setSub]=useState('');
  const [brands,setBrands]=useState(["HP",
  "Asus",
  "Samsung",
  "Lenovo",
  "Microsoft",
  'Apple',
"LG"]);
  const[brand,setBrand]=useState('');
  const[colors,setColors]=useState(["Black",
  "Brown",
  "Silver",
  "White",
  "Blue",
  'Red']);

  const [color,setColor]=useState('');
  const[shipping,setShipping]=useState(''); 
  const [page,setPage]=useState(1);
  const[total,setTotal]=useState(0);
 const [filterOption,setfilterOptions]=useState({color:"",shipping:"",star:"",price:""})
 const paginationOptions={page:page,pageSize:10};
 const[filter,setFilter]=useState(false)

const slug=match.params.slug
  console.log(slug)
  //fetch product ..its unversal
  const fetchProducts = () => {
    setLoading(true)
    getProductsCountWithFilter({query:slug,...filterOption}).then(res=>{
      setTotal(res.data);
      fetchProductsByFilter({query:slug,...paginationOptions,...filterOption}).then((res) => {
        setProducts(res.data);   
        setLoading(false)   
      })  
    })
  };

  //when pages load for the first time
  useEffect(() => {   
     window.scroll(0,0)
     //set query for the first-time
     fetchProducts()
    //fetch categories
    getCategories().then((res) => setCategories(res.data));
    //fetch sub categories
  getSubs().then(res=>{
    setSubs(res.data);
    
  })


  if(window.innerWidth > 700){
    setFilter(true)
  }


  window.addEventListener("resize",handleResize)
  return ()=>window.removeEventListener('resize',handleResize)

  }, []);



//handler for resize event
const handleResize=(e)=>{

  if(e.target.innerWidth > 700){
    setFilter(true)
  }
  
  if(e.target.innerWidth <=700){
    setFilter(false)
  }
  
  }


//when page is changed
  useEffect(()=>{
    fetchProducts()
  },[page])

  //when filter option is changed
  useEffect(()=>{
  fetchProducts()
},[filterOption])

 





  //3 load product based on price range
  useEffect(() => {
    setfilterOptions({...filterOption,price:price})
  }, [ok]);

  //handle slider
  const handleSlider = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
      console.log("i am settime out ")
    }, 300);
  };

    //5. show products by star rating

    const handleStarClick=(num)=>{
     setStar(num)
    }

    useEffect(()=>{setfilterOptions({...filterOption,star:star})},[star])


    const showStars=()=>
      <div className="pr-4 pl-4 pb-2">
              <Star  starClick={handleStarClick} numberOfStars={5} />
              <Star  starClick={handleStarClick} numberOfStars={4} />
              <Star  starClick={handleStarClick} numberOfStars={3} />
              <Star  starClick={handleStarClick} numberOfStars={2} />
              <Star  starClick={handleStarClick} numberOfStars={1} />
                       
      </div>

      //7 show product based on color
      const showColors=()=>colors.map((c)=><>
      <Radio 
      value={c} 
       checked={c===color}
        onChange={handleColor}
         className="pb-1 pl-1 pr-4"
          >
            {c}
            </Radio>
            <br/>
      </>)

const handleColor=(e)=>{
  setColor(e.target.value);  

}   

useEffect(()=>{
  setfilterOptions({...filterOption,color:color})
},[color])




//9. show product based on shippings yes/no

const showShipping=(e)=>(

<>
<Checkbox className="pb-2 pl-4 pr-4" 
onChange={handleShippingChange} 
value="Yes"
checked={shipping==="Yes"}
>
Yes
  </Checkbox>
  <br/>

<Checkbox className="pb-2 pl-4 pr-4"
onChange={handleShippingChange} 
value="No"
checked={shipping==="No"}
>
  NO
</Checkbox>

</>

)


const handleShippingChange=(e)=>{
 setShipping(e.target.value)
}

useEffect(()=>{
  setfilterOptions({...filterOption,shipping:shipping})
},[shipping])

  return (
    <div className="container-fluid marginheader" >
      <div className="row">
        <div className="col-md-3" style={{margin:"0px",padding:"0px"}}>

           <button 
           onClick={()=>{
             setFilter(!filter)
           }}
           className="filter-btn">{filter?"x":"Filter"}</button>
            <h4 className="text-danger filter-heading">FILTER </h4>
        <hr/>
     {
       filter?<Menu className="filter" defaultOpenKeys={["1", "2","3","4","5","6","7"]} mode="inline">
       <SubMenu
         key="1"
         title={
           <span className="h6">
             <DollarOutlined />
             Price
           </span>
         }
       >
         <div>
           <Slider
             className="ml-4 mr-4"
             tipFormatter={(v) => `₹ ${v}`}
             range
             value={price}
             onChange={handleSlider}
             max="100996"
           />
         </div>
       </SubMenu>
     
      {/* star */}
        <SubMenu
         key="3"
         title={
           <span className="h6">
             <StarOutlined />
             Rating
           </span>
         }
       >
         <div style={{marginTop:"-10px"}}>
           {showStars()};

           </div>
       </SubMenu>

       {/* color */}
       <SubMenu
         key="6"
         title={
           <span className="h6">
             <BgColorsOutlined/>
             Colors
           </span>
         }
       >
         <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
           {showColors()};

           </div>
       </SubMenu>

{/* shipping */}
       <SubMenu
         key="7"
         title={
           <span className="h6">
             <i class="fas fa-truck"></i>
             Shipping
           </span>
         }
       >
         <div className="pl-4 pr-4" style={{marginTop:"-10px"}}>
           {showShipping()};

           </div>
       </SubMenu>

     </Menu>:""
     }
        </div>
        
        <div className="col-md-9 pt-2">

         <div>
         {loading?"":products.length < 1?<p className="pt-5">No products found</p>:""}

{loading?(<LoadingCard count={10} />):(<div className="  pt-4 pb-5" style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
  {products.map((p) => ( <>
    <div key={p._id} className="  col-xs-12 col-sm-12 mt-3 col-lg-6 col-xl-4 col-md-6" >
      <ProductCard product={p} />
    </div>
    </>
  ))}
 <nav   className=" row text-center p-2 mt-2" style={{display:"block",width:"100%"}}>
   <a href="#top">
   <Pagination
    current={page}
    pageSize={10}
    total={total}
    onChange={(value)=>{setPage(value)}}
    hideOnSinglePage={true} />
   </a>
    </nav>
         </div>)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
