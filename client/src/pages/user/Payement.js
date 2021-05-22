import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import StripeElement from '../../components/forms/StripeElement'


//load stripe outside of render component to avoid recreating  stripe object on every render
const payement=loadStripe(process.env.REACT_APP_STRIPE_KEY)

function Payement() {
    return (
        <div className="container-fluid marginheader">
            <div className="row justify-content-center " style={{minHeight:"100vh"}}>
                      <div className="col-md-8 text-center pt-2">
                          <h4>Complete your Payement</h4>
                          <Elements stripe={payement}>
                              <StripeElement />
                          </Elements>
                      </div>
            </div>
        </div>
    )
}

export default Payement
