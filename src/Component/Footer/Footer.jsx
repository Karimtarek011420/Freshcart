import React from 'react'

export default function Footer() {
  return <>
  <footer className='py-5  bg-main-light'>
  <div className='container'>
    <h4 className='main'>Get the FreshCart app</h4>
    <p  className='main'>We can send you alink , it open it on your phone to download the app</p>
    <div className='row'>
      <div className='col-md-9'>
        <input type="email"  placeholder='Email' className='form-control my-2'/>
      </div>
      <div className='col-md-3'>
        <button type='sumbit' className='border-0 py-2 px-3 rounded-2 my-2 btnfotgot'>Shre APP Link</button>
      </div>
    </div>
      <div className='d-flex justify-content-between oline'>
      <div className='d-flex my-3'>
        <p className='fw-bold'>Payment Partners</p>
        <img src={require("../../images/MasterCard_Logo.svg.webp")} width={50} alt="" className='mx-2' />
        <img src={require("../../images/download.png")} width={40} className='mx-2' alt="" />
        <img src={require("../../images/images.png")} width={40} alt="" />
      </div>
      <div className='d-flex my-3'>
<p className='fw-bold me-2'>Get delivers to FreshCart</p>
        <img src={require("../../images/download.jpg")} width={40} alt="" />
        <img src={require("../../images/ar_badge_web_generic.png")} width={80} alt="" />

      </div>

      </div>



  </div>

  </footer>
  
  </>
}
