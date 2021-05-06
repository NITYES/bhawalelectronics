import axios from 'axios';

export const getSubs=async ( )=>{

    return await axios.get(`${process.env.REACT_APP_API}/sub`);
   
   }

   export const getSub=async (slug)=>{
    return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`)
   
   }

   export const removeSub=async (slug,authtoken)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`,{
        headers:{
            authtoken,
        }
    })
   
   }


   export const updateSub=async (slug,body,authtoken)=>{
    return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`,body,{
        headers:{
            authtoken,
        }
    })
   
   }
   

   export const createSub=async (sub,authtoken)=>{

    return await axios.post(`${process.env.REACT_APP_API}/sub`,sub,{
        headers:{
            authtoken:authtoken
        }
    })
   
   }