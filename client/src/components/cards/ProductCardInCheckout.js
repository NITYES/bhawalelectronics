import React from 'react'
import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import {useDispatch} from "react-redux"
import { toast } from 'react-toastify';
import './ProductCardInCheckout.css'
import {CheckCircleOutlined,CloseCircleOutlined,CloseOutlined} from '@ant-design/icons'


function ProductCardInCheckout({ p }) {

    const colors = ["Black",
        "Brown",
        "Silver",
        "White",
        "Blue",
        'Red'];


const dispatch=useDispatch();

    const handleColorChange = (e) => {
        let cart=[];
        if(typeof Window !== "undefined"){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product,i)=>{
                if(product._id==p._id){
                    cart[i].color=e.target.value
                }
            })

            console.log('updated cart color',cart);


            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch({
                type:"ADD_TO_CART",
                payload:cart
            })
        }
    };


    //handle quantity cahnge
    const handleQuantityChange=(e)=>{

        console.log('cquanatity changed', e.target.value);

let count=e.target.value <1?1:e.target.value;

if(count>p.quantity){
    toast.error(`max available quantity ${p.quantity}`)
    return;
}

        let cart=[];
        if(typeof Window !== "undefined"){
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product,i)=>{
                if(product._id==p._id){
                    cart[i].count=count
                }
            })

            console.log('updated cart count',cart);


            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch({
                type:"ADD_TO_CART",
                payload:cart
            })
        }


    }

     //handle Delete Items
     const handleDelete=(e)=>{


        let cart=[];
        if(typeof Window !== "undefined"){ 
            if(localStorage.getItem('cart')){
                cart=JSON.parse(localStorage.getItem('cart'));
            }
            cart.map((product,i)=>{
                if(product._id==p._id){
                    cart.splice(i,1)
                }
            })
            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch({
                type:"ADD_TO_CART",
                payload:cart
            })
        }
       
    }

    return (
        <tbody>
            <tr>
                <td className="td-image">
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />) : (
                            <ModalImage small={laptop} large={laptop} />
                        )}
                    </div>
                </td>
                <td className="td-100" style={{textTransform:"uppercase"}}>{p.title}</td>
                <td className="td-100"><span className="small">Rs. </span>{p.price}</td>
                <td className="td-100">{p.brand}</td>
                <td className="td-100">
                    <select onChange={handleColorChange} name="color" className="form-control">
                        {p.color ? <option>{p.color}</option> : <option value={p.color}>Select</option>}
                        {colors.filter((c) => c !== p.color).map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </td>
                <td className="text-center td-100">
                    <input className="form-control" value={p.count} onChange={handleQuantityChange} type="number" />
                    </td>
                <td className="text-center td-100">
                    <span className="small">Shipping  </span>
                    {p.shipping=="Yes"?<CheckCircleOutlined className="text-success" />:<CloseCircleOutlined className="text-danger" />}
                </td>
                <td className="text-danger text-center td-100"><CloseOutlined onClick={handleDelete}  className="pointer"/></td>
            </tr>
        </tbody>
    );

}

export default ProductCardInCheckout