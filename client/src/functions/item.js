
import axios from 'axios'
import {isNumber} from 'lodash'
import {slugify} from '../functions/helper'

   export const createItem=async (sub,authtoken)=>{

    return await axios.post(`${process.env.REACT_APP_API}/item`,sub,{
        headers:{
            authtoken:authtoken
        }
    })
   
   }



   export const getItems=async ( )=>{

    return await axios.get(`${process.env.REACT_APP_API}/items`);
   
   }


   export const getItemsBySub=async ( subId)=>{
       let field;
     if(isNumber(subId)){
               field=subId
     }else{
         field=slugify(subId,{join:"-"})
     }
    return await axios.get(`${process.env.REACT_APP_API}/items/${field}`);
   
   }