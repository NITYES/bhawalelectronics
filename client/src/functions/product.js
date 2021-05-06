import axios from './axios';


export const createProduct=async (product,authtoken)=>{
 return  await axios.post(`/product`,product,{
       headers:{
           authtoken
       }
   })
}

export const getProductsByCount=async (count)=>{
    return await axios.get(`/products/${count}`)
   
   }



   export const removeProduct=async (slug,authtoken)=>{
    return  await axios.delete(`/product/remove/${slug}`,{
          headers:{
              authtoken
          }
      })
   }



   export const getProduct=async (slug)=>{
    return await axios.get(`/product/${slug}`)
   
   }


   export const updateProduct=async (slug,product,authtoken)=>{
    return  await axios.put(`/product/${slug}`,product,{
          headers:{
              authtoken
          }
      })
   }


   export const getProducts=async (sort,order,page)=>{
    return  await axios.post(`/products`, {
        sort,
        order,
        page
    } ) }

    export const getProductsCount=async ()=>{
        return await axios.get(`/products/total`)
       
       }


       export const getProductsCountWithFilter=async (filter)=>{
        return await axios.post(`/products/total/filter`,filter)
       
       }



       export const productStar=async (productId,star,authtoken)=>{
        return  await axios.put(`/product/star/${productId}`,{star},{
              headers:{
                  authtoken
              }
          })
       }


       export const getRelated=async (productId)=>{
        return await axios.get(`/product/related/${productId}`)
       
       }


       export const fetchProductsByFilter=async (arg)=>{
        return  await axios.post(`/search/filters`, arg ) 
    
    }


    export const getCategoryCount=async ()=>{
        return await axios.get(`/product/category/count`)
    }