import axios from './axios';


export const userCart=async (cart,authtoken)=>{
    return  await axios.post(`/user/cart`,{cart},{
          headers:{
              authtoken
          }
      })
   }


   export const getUserCart=async (authtoken)=>{
    return  await axios.get(`/user/cart`,{
          headers:{
              authtoken
          }
      })
   }

   export const emptyUserCart=async (authtoken)=>{
    return  await axios.delete(`/user/cart`,{
          headers:{
              authtoken
          }
      })
   }


   export const saveUserAddress=async (address,authtoken)=>{
    return  await axios.post(`/user/address`,{address},{
          headers:{
              authtoken
          }
      })
   }


   export const saveContact=async (contact)=>{
    return  await axios.post(`/user/contact`,{contact})
   }