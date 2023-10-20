import React, { useState } from 'react'
import "./register.css"
import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
export default function Register() {
  const [erroMsg, seterroMsg] = useState(null);
  const [sucssmass, setsucssmass] = useState(null);
  const [loading, setloading] = useState(false);
  const  Navgite=useNavigate()
  async function sendData(values) {
      seterroMsg(null);
      setloading(true);
      try{
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,values)
        if(data.message === "success"){
          setsucssmass("The account was activated successfully");
          setTimeout(function(){Navgite('/login') },1000)
        }
      }
      catch(error){
        seterroMsg(error.response.data.message)
      };
      setloading(false);

    
}
 const objectData= useFormik({
    initialValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
    },
    onSubmit:sendData,
    validate:function(values){
      seterroMsg(null);
        const errors={};
        if(values.name.length <4 || values.name.length>12){
            errors.name="The name must contain a minimum of 4 Characters and a maximum of 12 Characters";
        };
        if(values.email.includes("@")===false ||values.email.includes(".") === false){
            errors.email="The email must contain a  @ and . ";
          };
          if( ! values.phone.match(/^01[0125][0-9]{8}$/)){
            errors.phone="The phone is not available";
          };
          if(values.password.length <6 || values.password.length>12){
            errors.password="The password must contain a minimum of 4 Characters and a maximum of 12 Characters "
          };
          if(values.rePassword !== values.password){
            errors.rePassword="password and rePassword dont match"
          };
          return errors;
    }
});
  return <>
<div className='w-75 m-auto py-4 mt-5'>
  {erroMsg?  <div className='alert alert-danger'>{erroMsg}</div>:''}
  {sucssmass?  <div className='alert alert-success'>{sucssmass}</div>:''}

    <h3>Register Now :</h3>
    <form onSubmit={objectData.handleSubmit}>
      <label htmlFor="name">Name :</label>
      <input onBlur={objectData.handleBlur} onChange={objectData.handleChange}  value={objectData.values.name} placeholder='your Name' type="text" className='form-control my-2'  id='name'/>
      {objectData.errors.name && objectData.touched.name ?<div className='alert alert-danger'>{objectData.errors.name}</div>:""}
      <label htmlFor="email">Email :</label>
      <input onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.email}  placeholder='your Email' type="email" className='form-control my-2'  id='email'/>
      {objectData.errors.email && objectData.touched.email ?<div className='alert alert-danger'>{objectData.errors.email}</div>:""}
      <label htmlFor="phone">Phone :</label>
      <input onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.phone}  placeholder='your phone' type="text" className='form-control my-2'  id='phone'/>
      {objectData.errors.phone && objectData.touched.phone ?<div className='alert alert-danger'>{objectData.errors.phone}</div>:""}
      <label htmlFor="password">Password :</label>
      <input  onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.password}  placeholder='your Password' type="password" className='form-control my-2'  id='password'/>
      {objectData.errors.password && objectData.touched.password ?<div className='alert alert-danger'>{objectData.errors.password}</div>:""}
      <label htmlFor="rePassword">rePassword :</label>
      <input onBlur={objectData.handleBlur} onChange={objectData.handleChange} value={objectData.values.rePassword}  placeholder='your rePassword' type="password" className='form-control my-2'  id='rePassword'/>
      {objectData.errors.rePassword && objectData.touched.rePassword ?<div className='alert alert-danger'>{objectData.errors.rePassword}</div>:""}
      <button type='sumbit' className='border-0 p-2 rounded-2 my-2' >
        {loading?      <TailSpin
  height="40"
  width="40"
  color="#fff"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>:"Register"}</button>
    </form>
  </div>  
  </>

}
