import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoImage from "../../images/freshcart-logo.svg"
import { authContect } from '../../Context/authiccotext'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {
  const{numOfCartItems}=useContext(CartContext)
 const {token,settoken}= useContext(authContect);
 const Navlogout= useNavigate()
 function Logout(){
  localStorage.removeItem("tkn");
  settoken(null);
  Navlogout("/login")
 }
  return <>
<nav className="navbar navbar-expand-lg bg-light position-fixed top-0 start-0 end-0 z-3  ">
  <div className="container">
    <Link className="navbar-brand" to="/products">
      <img src={LogoImage}  alt="freshcart-logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token?<>
          <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/allorders">Allorders</Link>
        </li>
     
        </>:''}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
 
        
        {token?<>
          <li className="nav-item d-flex justify-content-center align-items-center">
        <i className="fa-brands  me-3 fa-facebook"></i>
        <i className="fa-brands me-3 fa-twitter"></i>
        <i className="fa-brands me-3 fa-instagram"></i>
        <i className="fa-brands me-3 fa-tiktok"></i>
        <i className="fa-brands me-3 fa-youtube"></i>
        <i className="fa-solid fa-basket-shopping position-relative py-2">
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
    {numOfCartItems}
    <span className="visually-hidden"></span>
  </span>
        </i>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link mx-lg-3" to="/Profile">Profile</Link>
        </li>
        
      
        <li className="nav-item">
          <span onClick={Logout} className="nav-link" style={{cursor:'pointer'}}>LogOut</span>
        </li>
        
        </>:<>
        <li className="nav-item">
          <Link className="nav-link" to="/login">LogIn</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
        </>}
      </ul>
    </div>
  </div>
</nav>  
  
  
  </>
}
