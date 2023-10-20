import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'

export default function Profile() {
  const [Name, setName] = useState(null)
  useEffect(() => {
     
  const {name}=jwtDecode(localStorage.getItem("tkn"))
  setName(name)
  }, [])
 
if(Name===null){
  return <>
  <div  className=' vh-100 d-flex justify-content-center align-items-center '>
  <div >
  <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
</div>
</div>
</>
}
  return <>
  
  <div className=' container my-5 py-5 d-flex justify-content-center align-items-center text-center'>
  <div className='product w-75 h-75'>
    <h3 className='py-3'>Hello : <span className='main'>{Name}</span></h3>
    <h5>Welcome to the Frech Cart</h5>
  </div>

  </div>
  </>
}

