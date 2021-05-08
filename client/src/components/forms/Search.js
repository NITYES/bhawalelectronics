import React from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'
import {Newslugify} from '../../functions/helper'

const Search=()=>{
    let dispatch=useDispatch();
    const {search}=useSelector((state)=>({...state}));
     const{text} =search

     const history=useHistory();

     const handleChange=async (e)=>{
         //
         console.log(e.target.value)
         dispatch({
            type:"SEARCH_QUERY",
            payload:{text:e.target.value}
        })
        
     }
     const handleSubmit=(e)=>{
//   e.preventDefault()
         //
         if(text){
            history.push(`/products/${Newslugify(text,{join:"-"})}`)
         }
     }

     return(
             <form className="search-form" onSubmit={handleSubmit} style={{margin:"auto"}}>
            <input
            
            style={{outline:"0",border:"0",width:"80%",padding:"5px"}}
             type="search" 
             value={text} 
             className=" mr-sm-2"
             placeholder="search"
             onChange={handleChange}
             />
            <SearchOutlined onClick={handleSubmit} style={{fontSize:"20px",color:"black"}}/>
         </form>
     )

}


export default Search