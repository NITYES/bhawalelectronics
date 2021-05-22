import axios from './axios';

   export const createPayementIntent=async (authtoken)=>{

    return await axios.post(`/create-payement-intent`,{},{
        headers:{
            authtoken:authtoken
        }
    })
   
   }