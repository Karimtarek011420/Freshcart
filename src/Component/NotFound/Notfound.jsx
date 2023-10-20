import React from 'react'
import logo from '../../images/error.svg'

export default function Notfound() {
  return <>
  <div className='d-flex justify-content-center align-items-center vh-100 mt-5'>
    <div>
      <img src={logo} className='w-100' alt="" />
    </div>
  </div>
  </>
}
