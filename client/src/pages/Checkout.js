import React ,{useEffect,useState}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import {getUserCart,emptyUserCart,saveUserAddress} from '../functions/user';
import { Link } from 'react-router-dom';



const Checkout=({match})=>{

const[products,setProducts]=useState([]);
const[total,setTotal]=useState(0);
const dispatch=useDispatch();
const {user}=useSelector((state)=>({...state}))

useEffect(()=>{
getUserCart(user.token).then((res)=>{
    setProducts(res.data.products);
    setTotal(res.data.cartTotal)
})
},[])


const emptyCart=()=>{
    //remove cart from localstorage
    if(typeof Window !== "undefined"){
        localStorage.removeItem('cart')
    }
    //remove cart from redux state
    dispatch({
        type:"ADD_TO_CART",
        payload:[]
    });

    //remove from backend
    emptyUserCart(user.token).then(res=>{
        setProducts([]);
        setTotal(0);
        toast.success('Cart Is Empty . Continue Shopping')
    })

}



return (  
    <div className="row marginheader " style={{minHeight:"100vh"}}>
        <div className="col-6 mt-2 text-center">
          <h4>Delivery Information</h4>
          <p>Name:{user.name}</p>
          <p>Email:{user.email}</p>
          <p>Mobile:{user.mobile}</p>
          <p>Address:{user.address}</p>
          <Link to={{pathname:"/user/profile",state:match.path}} >Edit Details</Link>
        </div>
        <div className="col-6 mt-2 text-center">
  <h4>Order Summary</h4>
  <hr/>
  <p>Total Products : {products.length}</p>
  <hr/>
  {products.map((p,i)=>{
      return <div key={i}>
          <p>{p.product.title}({p.color}) x {p.count}={" "}
          {p.product.price* p.count}
          </p>
      </div>
  })}
  <hr/>
  <p>Total Amount= Rs. {total}</p>
  <hr/>
    <div className="row">
<div className="col-md-6">
    <Link to="/user/payement">
    <button className="btn btn-primary" disabled={user.mobile==""||user.address==""||user.name==""||products.length<=0} >Place Order</button>
    </Link>
</div>

<div className="col-md-6">
   <button 
   disabled={!products.length}
   onClick={emptyCart} 
   className="btn btn-primary">Empty Cart</button>
</div>
    </div>
</div>

    </div>
)

}

export default Checkout