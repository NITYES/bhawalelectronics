import React ,{useEffect,useState}from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import {getUserCart,emptyUserCart,saveUserAddress} from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
const Checkout=()=>{

const[products,setProducts]=useState([]);
const[total,setTotal]=useState(0);
const [address,setAddress]=useState('');
const[saveAddressDb,setSaveAddressDb]=useState(false);
const dispatch=useDispatch();
const {user}=useSelector((state)=>({...state}))

useEffect(()=>{
getUserCart(user.token).then((res)=>{
    console.log('user cart res',JSON.stringify(res.data,null,4));
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

const saveAddressToDb=()=>{
  console.log(address)
  saveUserAddress(address,user.token)
  .then(res=>{
      console.log(res.data)
      if(res.data.ok){
  setSaveAddressDb(true)
      }
  })
    //
}

return (
    <div className="row marginheader ">
        <div className="col-6 mt-2">
             <h4>Delivery address</h4>
             <br/>
             <ReactQuill value={address} theme="snow" onChange={setAddress} style={{border:"1px solid black"}} />
<button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
    save
</button>
<hr/>
<p>got ccoupon</p>
<br/>
coupon input and apply coupon
        </div>
        <div className="col-6 mt-2">
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
   <button className="btn btn-primary" disabled={!saveAddressDb&&products}>Place Order</button>
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