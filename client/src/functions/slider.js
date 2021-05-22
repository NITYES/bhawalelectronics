
import axios from './axios';

export const addSlider=async (images,authtoken)=>{
    return  await axios.post(`/admin/addslider`,images,{
          headers:{
              authtoken
          }
      })
   }

   export const getSlider=async ()=>{
       return await axios.get('/getslider');
   }