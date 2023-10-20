import React, { useState } from 'react'
import "./forgotpass.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
export default function Forgetpass() {
  const [erroMsg, seterroMsg] = useState(null);
  const [sucssmass, setsucssmass] = useState(null);
  const [loading, setloading] = useState(false);
  const  Navgite=useNavigate()
  async function loginData(values) {
      seterroMsg(null);
      setloading(true);
      try{
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" ,values)
        if(data.message === "success"){
          setsucssmass("Welcome to The FrechCart");
          setTimeout(function(){Navgite('/products') },1000)
        }
      }
      catch(error){
        seterroMsg(error.response.data.message)
      };
      setloading(false);

    
}
 const objectData= useFormik({
    initialValues:{
        email:'',
        password:'',
    },
    onSubmit:loginData,
    validate:function(values){
      seterroMsg(null);
        const errors={};
      
        if(values.email.includes("@")===false ||values.email.includes(".") === false){
            errors.email="The email must contain a  @ and . ";
          };
          if(values.password.length <6 || values.password.length>12){
            errors.password="The password must contain a minimum of 4 Characters and a maximum of 12 Characters "
          };
          return errors;
    }
});
  return <>
<div className='w-75 m-auto py-4'>
  {erroMsg?  <div className='alert alert-danger'>{erroMsg}</div>:''}
  {sucssmass?  <div className='alert alert-success'>{sucssmass}</div>:''}

    <h3>Register Now :</h3>
    <form onSubmit={objectData.handleSubmit}>
      <label htmlFor="email">Email :</label>
      <input onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.email}  placeholder='your Email' type="email" className='form-control my-2'  id='email'/>
      {objectData.errors.email && objectData.touched.email ?<div className='alert alert-danger'>{objectData.errors.email}</div>:""}
      <div className='d-flex justify-content-between align-items-md-center forgotpass'>
      <button type='sumbit' className='border-0 p-2 rounded-2 my-2 btnfotgot' >
        {loading?      <TailSpin
  height="40"
  width="40"
  color="#fff"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>:"Login"}</button>
<h5 className='fw-bold'><NavLink to="/forgotpass">ForgotPassword?<span> Click here</span></NavLink></h5>
      </div>
      
    </form>
  </div>  
  </>

}
