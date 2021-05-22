import React, { useState } from 'react'
import "./ProfileForm.css";
import {saveUserProfile} from '../../functions/user'
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function ProfileForm({match,history}) {

    const { user } = useSelector((state) => ({ ...state }));



    const initialValue={
        email:user.email,
        name:user.name,
        mobile:user.mobile,
        address:user.address
    }
const[profileValue,setProfileValue]=useState(initialValue);



const handleChange=(e)=>{
setProfileValue({...profileValue,[e.target.name]:e.target.value})
}

const saveProfile=(e)=>{
e.preventDefault();
console.log(profileValue);
saveUserProfile(profileValue,user.token).then(res=>{
    toast.success("Profile Updaed");
    window.location.reload();
}).catch(err=>{
    toast.error("Profile Update Failed.Please Try Again")
})
}

    return (
        <div>
            <form onSubmit={saveProfile}>
                    <label>Email:</label>
                    <input className="input"
                     disabled
                      value={profileValue.email} />

                    <label>Name:</label>
                   <input 
                   className="input"
                    name="name" 
                    placeholder="name"
                    value={profileValue.name}
                    onChange={handleChange}
                    />

                <label>Mobile:</label>
                <input className="input" 
                value={profileValue.mobile}
                name="mobile" 
                placeholder="mobile"
                onChange={handleChange}

                />

                <label>Address:</label>
                <input
                 className="input"
                  placeholder="address"
                  value={profileValue.address}
                   name="address" 
                   onChange={handleChange}
                   />
                <button className="btn btn-lg btn-primary">Submit</button>
                {
                    history.location.state=="/user/checkout"&&<Link to={history.location.state} >Back to CheckOut</Link>

                }
            </form>
        </div>
    )
}

export default ProfileForm
