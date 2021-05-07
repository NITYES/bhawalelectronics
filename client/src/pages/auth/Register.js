import React, { useState,useEffect } from "react";
import {useSelector} from "react-redux";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
const Register = ({history}) => {
  const [email, setEmail] = useState("");

  const {user}=useSelector((state)=>{
    return {...state}
})

  useEffect(()=>{
    
    if(user&&user.token) history.push("/")

}
,[user,history])

  //submit handler
  const handlesubmit = async (e) => {
    //
    e.preventDefault();
    const config = {
      url: "http://www.bhawalelectronics.com/register/complete",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email sent to ${email} .Click the link to complete your registration`
    );

    //save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    //clear state
    setEmail("");
  };

  //create form function
  const registerForm = () => (
    <form className="marginheader" style={{minHeight:"100vh"}} onSubmit={handlesubmit}>
      <p>We will send sign up link to your gmail.</p>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Your email"
      />
      <br/>
      <button type="submit" className="btn btn-raised btn-primary">
        Send me sign up link
      </button>
    </form>
  );
  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {registerForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
