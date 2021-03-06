import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link} from  'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout.js';
import {userCart} from '../functions/user'
import './Cart.css'

const Cart=({history})=>{

   useEffect(()=>{
    window.scroll(0,0)

   },[])

    const {cart,user}=useSelector((state)=>({...state}));
    const dispatch=useDispatch();

    const getTotal=()=>{
        return cart.reduce((currentValue,nextValue)=>{
                 return currentValue + nextValue.count * nextValue.price
        },0)
    }

    const saveOrderToDb=()=>{
 console.log(JSON.stringify(cart,null,4))
userCart(cart,user.token).then(res=>{
    console.log(res);
    if(res.data.ok){
        history.push('/user/checkout')

    }
}).catch(err=>console.log(err))

    }

    const showCartElement=()=>(
        <table className="table table-bordered ">
                <thead className="thead-light"> 
                     <tr>
                         <th scope="col"> Image</th>
                         <th scope="col"> Title</th>
                         <th scope="col"> Price</th>
                         <th scope="col"> Brand</th>
                         <th scope="col"> color</th>
                         <th scope="col"> Quantity</th>
                         <th scope="col"> Shipping</th>
                         <th scope="col"> Remove</th>


                     </tr>
                </thead>
                {
                    cart.map((p)=>(
                        <ProductCardInCheckout key={p._id} p={p} />
                    ))
                }
        </table>
    )

    

 return (<div className="container-fluid pt-2 marginheader" style={{minHeight:"100vh"}}>
      <div className="row">

          <div className="col-md-8">
          <h4>Cart/{cart.length}</h4>
              {!cart.length?<p>No Product In The Cart.<Link to="/"> Continue Shopping</Link></p>:
              showCartElement()
              }
          </div>
          <div className="col-md-4">
              <h4>Order Summary</h4>
              <hr/>
              <p>Product</p>
              {cart.map((c,i)=>(
                  <div key={i}>
                         <p>{c.title} x {c.count}= Rs. {c.price*c.count}</p>
                  </div>
              ))}
              <hr/>
               Total : <b>Rs. {getTotal()}</b>
              <hr/>
              {/* {
                  user?(
                      <button onClick={saveOrderToDb} 
                      className="btn btn-sm btn-primary mt-2"
                      disabled={!cart.length}
                      >
                          Proceed To Checkout
                          </button>
                  ):
                  ( <button className="btn btn-sm btn-primary mt-2">
                          <Link
                          to={{
                              pathname:"/login",
                              state:{from:"/cart"},
                          }}
                          >
                          Login To Proceed</Link>
                  </button>)
              } */}

            <Link to="/contact">
            <button className="btn btn-lg btn-primary">Place Order</button>
            </Link>

              </div>

      </div>
  </div>)

}


export default Cart