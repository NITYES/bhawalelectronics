import React, { useEffect, useState } from 'react'
import AdminNav from '../../components/nav/AdminNav'
import SliderImageForm from '../../components/forms/SliderImageForm';
import { addSlider,getSlider } from '../../functions/slider'
import {useSelector} from 'react-redux'

const Slider=()=>{
const [values,setValues]=useState({
    images:[]
})

const { user } = useSelector((state) => ({ ...state }));
const [loading,setLoading]=useState(false);


useEffect(()=>{
        getSlider().then(res=>{
            setValues({...values,images:res.data})
        })
},[])

const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(values.images);
    addSlider(values.images,user.token).then(res=>{
        console.log(res.data)
    }).catch(error=>{
        console.log(error.response.data)
    })
}

    return(
        <div className="container-fluid marginheader">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
          <div className="col">
             <h4>Add Slider Images</h4>
            {loading&&<p>loading...</p>}
            <SliderImageForm
            values={values}
            setValues={setValues}
            setLoading={setLoading}
            />
            <button onClick={handleSubmit} className="btn btn-primary btn-lg">
                submit
            </button>
          </div>
        </div>
    </div>
    )
}


export default Slider