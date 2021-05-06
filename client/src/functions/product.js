import axios from 'axios';


export const createProduct=async (product,authtoken)=>{
 return  await axios.post(`${process.env.REACT_APP_API}/product`,product,{
       headers:{
           authtoken
       }
   })
}

export const getProductsByCount=async (count)=>{
    return await axios.get(`${process.env.REACT_APP_API}/products/${count}`)
   
   }



   export const removeProduct=async (slug,authtoken)=>{
    return  await axios.delete(`${process.env.REACT_APP_API}/product/remove/${slug}`,{
          headers:{
              authtoken
          }
      })
   }



   export const getProduct=async (slug)=>{
    return await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
   
   }


   export const updateProduct=async (slug,product,authtoken)=>{
       console.log(product)
    return  await axios.put(`${process.env.REACT_APP_API}/product/${slug}`,product,{
          headers:{
              authtoken
          }
      })
   }


   export const getProducts=async (sort,order,page)=>{
    return  await axios.post(`${process.env.REACT_APP_API}/products`, {
        sort,
        order,
        page
    } ) }

    export const getProductsCount=async ()=>{
        return await axios.get(`${process.env.REACT_APP_API}/products/total`)
       
       }


       export const getProductsCountWithFilter=async (filter)=>{
           console.log(filter)
        return await axios.post(`${process.env.REACT_APP_API}/products/total/filter`,filter)
       
       }



       export const productStar=async (productId,star,authtoken)=>{
        return  await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`,{star},{
              headers:{
                  authtoken
              }
          })
       }


       export const getRelated=async (productId)=>{
        return await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`)
       
       }


       export const fetchProductsByFilter=async (arg)=>{
           console.log('fetch product by query',arg.query)
        return  await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg ) 
    
    }


    export const getCategoryCount=async ()=>{
        console.log("get category count called")
        return await axios.get(`${process.env.REACT_APP_API}/product/category/count`)
    }