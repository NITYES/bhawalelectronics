import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct} from "../../../functions/product";
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import {
    getCategories,
    getCategorySubs 
    
  } from "../../../functions/category";

  import {getItemsBySub} from '../../../functions/item'
  import FileUpload from '../../../components/forms/FileUpload'
  import {LoadingOutlined} from '@ant-design/icons'
const initialState={
    title:'',
    description:"",
    details:"",
    price:'',
    categories:[],
    category:'',
    subs:[],
    shipping:'Yes',
    quantity:'50',
    images:[],
    colors:["Black","Brown","Silver","White","Blue",'Red'],
    brands:["HP","Asus","Samsung","Lenovo","Microsoft",'Apple','LG'],
    color:'White',
    brand:'Apple',
    item:""
}

const ProductCreate=()=>{

const [values,setValues]=useState(initialState);
const [subOption,setSubOption]=useState([]);
const [showSub,setShowSub]=useState(false);
const [loading,setLoading]=useState(false);
const[itemOption,setItemOption]=useState([]);


//redux
const {user}=useSelector((state)=>({...state}))
//destructure 
const {title,description,price,categories,category,subs,shipping,quantity,images,colors,brands,color,brand,details}=values


useEffect(()=>{

  loadCategories();

  },[])


 const loadCategories=()=>getCategories().then(c=>setValues({...values,categories:c.data}));

const handleSubmit=(e)=>{
    e.preventDefault();
    createProduct(values,user.token).then(res=>{
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
    }).catch(err=>{
        console.log(err);
        // if(err.response.status===400) toast.error(err.response.data);
        toast.error(err.response.data.err)

    })
}


const handleChange=(e)=>{
//
setValues({...values,[e.target.name]:e.target.value})

}

const handleCategoryChange=(e)=>{
    e.preventDefault();
    setValues({...values,subs:[],category:e.target.value,item:""});
    setItemOption([])
    
    //get sub category based on category selected
    getCategorySubs(e.target.value)
    .then(res=>{
       setSubOption(res.data);

    });
    setShowSub(true);

}


const handleSubCategoryChange=(value)=>{

  getItemsBySub(value).then(res=>{
      setItemOption(res.data);
  })


}

return(
    <div className="container-fluid marginheader">
            <div className="row">
                       <div className="col-md-2">
                           <AdminNav />
                       </div>
                       <div className="col-md-10">
                        {loading?
                        <LoadingOutlined className="h1 text-danger"/>
                        :(<h4>Create New Product</h4>)}
                       <div className="p-3">
                       <FileUpload 
                       values={values}
                       setValues={setValues}
                       setLoading={setLoading}
                       />
                       </div>
                        <hr/>
                        {<ProductCreateForm 
                         values={values} 
                         handleChange={handleChange} 
                         handleSubmit={handleSubmit}
                         handleCategoryChange={handleCategoryChange}
                        subOption={subOption}
                         showSub={showSub}
                         setValues={setValues}
                         handleSubCategoryChange={handleSubCategoryChange}
                         itemOption={itemOption}
                         />}
                       </div>
            </div>
    </div>
)

}


export default ProductCreate