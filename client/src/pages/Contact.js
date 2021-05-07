import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import ContactForm from '../components/forms/ContactForm'
import {saveContact} from '../functions/user'
const Contact = () => {

    const[name,setName]=useState('');
    const[address,setAddress]=useState('')
    const[mobile,setMobile]=useState("");

    const{cart}=useSelector((state)=>({...state}));

    const handleSubmit=(e)=>{
        e.preventDefault();
        saveContact({name,address,mobile,cart}).then(res=>{
            toast.success(res.data.msg);
        }).catch(err=>{
            toast.error(err.response.data.msg)
        })
        console.log(name,address,mobile,cart);
    }

    return (
        <div className="container-fluid marginheader">
            <div className="row " style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div className="col-6">
                    <ContactForm
                    name={name}
                    setName={setName}
                    address={address}
                    setAddress={setAddress}
                    mobile={mobile}
                    setMobile={setMobile}
                    cart={cart}
                    handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}


export default Contact