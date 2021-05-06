import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import {Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct,updateProduct} from "../../../functions/product";
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'
import {
    getCategories,
    getCategorySubs 
    
  } from "../../../functions/category";

  import {getItemsBySub} from '../../../functions/item'
  import FileUpload from '../../../components/forms/FileUpload'
  import {LoadingOutlined} from '@ant-design/icons'
  import {useParams} from 'react-router-dom'

//props.match.params.slug
//let {slug} =useParams();

const initialState={
    title:'',
    description:"",
    price:'',
    category:'',
    subs:"",
    shipping:'',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","White","Blue",'Red'],
    brands:["HP","Asus","Samsung","Lenovo","Microsoft",'Apple',"LG"],
    color:'',
    brand:'',
    item:""
}

const ProductUpdate=({match,history})=>{

const [values,setValues]=useState(initialState);
const [categories,setCategories]=useState([]);
const [subOption,setSubOption]=useState([]);
const [itemOption,setitemOption]=useState([]);
const [showSub,setShowSub]=useState(false);
const [selectedCategory,setSelectedCategory]=useState('');
const [loading,setLoading]=useState(false);
const[sub,setSub]=useState("");
const[item,setItem]=useState("")


console.log("from top",values)
//redux
const {user}=useSelector((state)=>({...state}))

const {slug}=match.params


useEffect(()=>{
loadProduct();
loadCategories();


},[])

const loadProduct=()=>{
    getProduct(slug).then(res=>{
//1. load single product
setValues({...values,...res.data});
//2 load single product category subs
getCategorySubs(res.data.category)//get sub cstegories of a categories by name not by _id;    
.then(subres=>{
    setSubOption(subres.data);
    console.log(subres.data)

    getItemsBySub(res.data.subs).then((itemsres)=>{
        console.log(itemsres.data)
        setitemOption(itemsres.data)
    })
     
});
//3 prepare array of sub ids to show as default sub values 

})
.catch(err=>{
    console.log(err)
})
}


const loadCategories=()=>
getCategories().
then(c=>setCategories(c.data));


const handleSubmit=(e)=>{
    e.preventDefault();

setLoading(true)
updateProduct(slug,values,user.token)
.then(res=>{
    setLoading(false)
    toast.success(`"${res.data.title}" is updated`);
    history.push('/admin/products')

})
.catch(err=>{
    console.log(err)
    setLoading(false)
    toast.error(err.response.data)
})

}

//handleChange
const handleChange=(e)=>{

    setValues({...values,[e.target.name]:e.target.value});

}

useEffect(()=>{
    setSubOption([])
    setitemOption([])
  getCategorySubs(values.category)//get sub cstegories of a categories by name not by _id;    
.then(subres=>{
    setSubOption(subres.data);   
});
},[values.category])

useEffect(()=>{
    setitemOption([]);
    getItemsBySub(values.subs).then((itemsres)=>{
        setitemOption(itemsres.data)
    })
},[values.subs])
    


return(
    <div className="container-fluid marginheader">
            <div className="row">
                       <div className="col-md-2">
                           <AdminNav />
                       </div>
                       <div className="col-md-10">
                       {loading?
                        <LoadingOutlined className="h1 text-danger"/>
                        :(<h4>Product Upload</h4>)}
                        {JSON.stringify(values)}
                        <hr/>
                  <div className="p-3">
                       <FileUpload 
                       values={values}
                       setValues={setValues}
                       setLoading={setLoading}
                       />
                       </div>
                       <br/>
                  <ProductUpdateForm
                  values={values}
                  setValues={setValues}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  categories={categories}
                  subOption={subOption}
                  selectedCategory={selectedCategory}
                  itemOption={itemOption}

                  />
                       </div>
            </div>
    </div>
)

}


export default ProductUpdate