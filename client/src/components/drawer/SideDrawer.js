import React from 'react'
import {Drawer,Button} from 'antd';
import {useSelector,useDispatch} from 'react-redux'
import laptop from  "../../images/laptop.png";
import {Link} from 'react-router-dom'

const SideDrawer=({children})=>{

const {cart,drawer}=useSelector((state)=>({...state}));
const dispatch=useDispatch();

return <Drawer 
className="text-center"
title={`CART/${cart.length} product`}
placement="right"
onClose={()=>{
    dispatch({
        type:"SET_VISIBILITY",
        payload:false
    })
}}
visible={drawer}>

      {cart.map(p=>{
         return <div className="row" key={p._id}>
                   <div class='col'>
                          {p.images ?(
                              <>
                              <img style={{width:"100px",height:"100px"}} src={p.images[0].url} />
                              <p>{p.title}x{ p.count}</p>
                              </>
                          ):(
                            <>
                            <img src={laptop} />
                            <p>{p.title} X { p.count}</p>
                            </>
                          )}
                   </div>
          </div>
      })}
      <Link to="/cart">
          <button className="text-center btn-block btn btn-primary btn-raised" onClick={()=>{
              dispatch({
                  type:"SET_VISIBILITY",
                  payload:false
              })
          }}>
              Cart
          </button>
      </Link>
</Drawer>

}

export default SideDrawer