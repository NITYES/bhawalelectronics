import React ,{useEffect,useState}from 'react';
import AdminNav from '../../../components/nav/AdminNav'
import {getProductsByCount} from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import {removeProduct} from '../../../functions/product'
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux';

const AllProducts=()=>{

const [products,setProducts]=useState([]);
const [loading,setLoading]=useState(false);

//redux
const {user}=useSelector((state)=>({...state}))


useEffect(()=>{
    loadAllProducts();
},[])


const loadAllProducts=()=>{
    setLoading(true)
    getProductsByCount(100)
    .then(res=>{
        console.log(res.data)
        setProducts(res.data)
        setLoading(false)
    }).catch(err=>{
        console.log(err)
        setLoading(false)
    })
}


const handleRemove=(slug)=>{
    
    if(window.confirm('Do you want to delete ?')){
        console.log('send delete request',slug)
        removeProduct(slug,user.token).then(res=>{

            loadAllProducts();
     toast.error(`${res.data.title} is deleted`);


        })
        .catch(err=>{

           if(err.response.data) toast.error(err.response.data)
           console.log(err);
        })
    }
}

    return(
        <div className="container-fluid marginheader">
        <div className="row">
            <div className="col-md-1">
                <AdminNav />
            </div>
          <div className="col">
          {loading?(<h4 className='text-danger'>loading...</h4>):(<h4>All Products</h4>)}

              <div className='row'>
             { products.map((product)=>{
                    
             return <div 
                     key={product._id}
                     className="col-md-4 pb-3">
                         <AdminProductCard 
                          product={product}
                          handleRemove={handleRemove}
                           />
                    </div>
                })}
              </div>
            
          </div>
        </div>
    </div>
    )
}

export default AllProducts