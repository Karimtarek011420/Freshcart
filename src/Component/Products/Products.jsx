import axios from 'axios'
// import React, { useEffect, useState } from 'react'
import {  Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import ProductSlide from '../ProductSlide/ProductSlide';
import CategroySlider from '../CategorySlider/CategroySlider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function Products() {
 const{AddtoCart}= useContext(CartContext)
  async function CartDatials(id){
   const res=await AddtoCart(id);
   if(res.status==="success"){
    toast.success(res.message,{
      duration:2000,
      
    })
  }else{
    toast.error("error")

  } }
  function getProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
      };
 const {data,isLoading}= useQuery("Allproducts",getProducts);
//  async function getProducts(){
//     const{data} =await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//     console.log(data.data);
//     setproducts(data.data)
//   }
//   const [products, setproducts] = useState(null);
//   useEffect(() => {
//     getProducts()
//   }, [])
if(isLoading){
  return <>
  <div className=' vh-100 d-flex justify-content-center align-items-center ' >
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
  <div className='container py-5 text-center'>
    <div className='row gx-0'>
      <div className='col-sm-9 '>
    <ProductSlide/>
      </div>
      <div className='col-sm-3'>
        <img width={"100%"} height={"200px"} src={require("../../images/grocery-banner-2.jpeg")} alt="" />
        <img width={"100%"} height={"200px"} src={require("../../images/grocery-banner.png")} alt="" />
      </div>
    </div>
    <CategroySlider/>
  <div className='row gy-3'>
    {data?.data.data.map(function(product,idx){return <div key={idx} className='col-lg-3'>
      <div className='product'>
      <Link to={`/productdatails/${product.id}`}> 
      <h5 className='main-color py-3 '>{product.category.name}</h5>
        <img src={product.imageCover} className='w-100' alt="product" />
        <h6 className='py-3'>{product.title.split(' ').slice(0,3).join()}</h6>
        <div className='d-flex justify-content-between align-items-center px-2'>
          <p>{product.price} <span className='main'>EGP</span> </p>
          <p><span><i class="fa-solid fa-star rating-color"></i> {product.ratingsAverage}</span></p>
        </div>
      </Link>
      <button onClick={()=>CartDatials(product.id)} className='form-control btn1 text-white'>+ Add to Card</button>
      </div>
    </div> })}
  </div>
</div>
  </>
}
