import axios from './axios';

export const loadMenu=async ()=>{

return await axios.get(`/menu`)

}

