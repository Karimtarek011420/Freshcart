import React, { useContext, useState } from 'react'
import "./login.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import { authContect } from '../../Context/authiccotext';
export default function Login() {
  const [erroMsg, seterroMsg] = useState(null);
  const [sucssmass, setsucssmass] = useState(null);
  const [loading, setloading] = useState(false);
  const  Navgite=useNavigate();
  const {settoken}=useContext(authContect)
  async function loginData(values) {
      seterroMsg(null);
      setloading(true);
      try{
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" ,values)
        if(data.message === "success"){
          localStorage.setItem("tkn",data.token)
          settoken(data.token)
            setsucssmass("Welcome back to The FrechCart");
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
<div className='w-75 m-auto py-4 mt-5'>
  {erroMsg?  <div className='alert alert-danger'>{erroMsg}</div>:''}
  {sucssmass?  <div className='alert alert-success'>{sucssmass}</div>:''}

    <h3>Login :</h3>
    <form onSubmit={objectData.handleSubmit}>
      <label htmlFor="email">Email :</label>
      <input onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.email}  placeholder='your Email' type="email" className='form-control my-2'  id='email'/>
      {objectData.errors.email && objectData.touched.email ?<div className='alert alert-danger'>{objectData.errors.email}</div>:""}
      <label htmlFor="password">Password :</label>
      <input  onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.password}  placeholder='your Password' type="password" className='form-control my-2'  id='password'/>
      {objectData.errors.password && objectData.touched.password ?<div className='alert alert-danger'>{objectData.errors.password}</div>:""}
      <div className='d-flex justify-content-between align-items-md-center forgotpass'>
      <button type='sumbit' className='border-0 py-2 px-3 rounded-2 my-2 btnfotgot' >
        {loading?<TailSpin
  height="40"
  width="40"
  color="#fff"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>:"Login"}</button>
<h5  className='fw-bold'><NavLink to="/forgotpass">ForgotPassword?<span className='fw-bold'> Click here</span></NavLink></h5>
      </div>
    </form>
  </div>  
  </>

}
