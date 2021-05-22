import React, { useEffect, useState } from 'react'
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js"
import {useSelector,useDispatch} from 'react-redux'
import {createPayementIntent} from "../../functions/stripe"
import styled from 'styled-components'

function StripeElement() {


    const dispatch=useDispatch();
    const {user}=useSelector((state)=>({...state}));

    const[succeeded,setSucceeded]=useState(false);
    const[error,setError]=useState(null);
    const[processing,setProcessing]=useState("");
    const[disabled,setDisabled]=useState(true);
    const[clientSecret,setClientSecret]=useState("");

    const stripe=useStripe();
    const elements=useElements();

    useEffect(()=>{
                  createPayementIntent(user.token)
                  .then(res=>{
                      console.log("create payement intet",res.data)
                      setClientSecret(res.data)
                  })
    },[])

const handleSubmit=async (e)=>{
    //
}

const handleChange=async (e)=>{
    //
}


const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };



    return (
        <>

<form id="payment-form"
className="stripe-form"
onSubmit={handleSubmit}
>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
      <button
      className="stripe-button"
      disabled={processing || disabled || succeeded}
      >
          <span id="button-text">
            {processing?<div className="spinner" id="spinner"></div>:"Pay"}
          </span>

      </button>
    </form>
        </>
    )
}

export default StripeElement
