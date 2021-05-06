import axios from './axios';

export const getSubs=async ( )=>{

    return await axios.get(`/sub`);
   
   }

   export const getSub=async (slug)=>{
    return await axios.get(`/sub/${slug}`)
   
   }

   export const removeSub=async (slug,authtoken)=>{
    return await axios.delete(`/sub/${slug}`,{
        headers:{
            authtoken,
        }
    })
   
   }


   export const updateSub=async (slug,body,authtoken)=>{
    return await axios.put(`/sub/${slug}`,body,{
        headers:{
            authtoken,
        }
    })
   
   }
   

   export const createSub=async (sub,authtoken)=>{

    return await axios.post(`/sub`,sub,{
        headers:{
            authtoken:authtoken
        }
    })
   
   }