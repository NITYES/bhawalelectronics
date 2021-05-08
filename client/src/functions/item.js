
import axios from './axios';
import {isNumber} from 'lodash'
import {Newslugify} from '../functions/helper'

   export const createItem=async (sub,authtoken)=>{

    return await axios.post(`/item`,sub,{
        headers:{
            authtoken:authtoken
        }
    })
   
   }



   export const getItems=async ( )=>{

    return await axios.get(`/items`);
   
   }


   export const getItemsBySub=async ( subId)=>{
       let field;
     if(isNumber(subId)){
               field=subId
     }else{
         field=Newslugify(subId,{join:"-"})
     }
    return await axios.get(`/items/${field}`);
   
   }