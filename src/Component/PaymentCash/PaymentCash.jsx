import axios from 'axios';
import React from 'react'
import { useContext,useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { TailSpin } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function PaymentCash() {
   const {Cartid,setCartproducts,setnumOfCartItems,settotalCartPrice}= useContext(CartContext)
   const [loading, setloading] = useState(false);
   const [loading1, setloading1] = useState(false);
   async function SubmitPayment(){
    setloading(true)
     const Phonevalue  = document.querySelector("#Phone").value;
     const Cityvalue  = document.querySelector("#City").value;
     const detailsvalue  = document.querySelector("#details").value;
     const ShippingAdess = {
        "shippingAddress":{
            "details": detailsvalue,
            "phone": Phonevalue,
            "city":Cityvalue
            }
     }

     try {
        const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${Cartid}`,ShippingAdess,{
            headers:{token:localStorage.getItem("tkn")}
        })
            if(data.status==="success"){
                toast.success("Cart add for Payement SUccessfully")
            }
            setCartproducts([])
            setnumOfCartItems(0)
            settotalCartPrice(0)
     } catch (error) {
        console.log(error);
     }
     setloading(false)

    }
    async function OnlinePayment(){
      setloading1(true)
       const Phonevalue  = document.querySelector("#Phone").value;
     const Cityvalue  = document.querySelector("#City").value;
     const detailsvalue  = document.querySelector("#details").value;
     const ShippingAdess = {
        "shippingAddress":{
            "details": detailsvalue,
            "phone": Phonevalue,
            "city":Cityvalue
            }
     }
      try {
        const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${Cartid}`,ShippingAdess,{
          headers:{token:localStorage.getItem("tkn")},
          params:{url:`http://localhost:${window.location.port}`}
        })
        window.open(data.session.url,"_blank");
      } catch (error) {
        
      }
      setloading1(false)

    }
  return <>
<div className='w-50 m-auto py-5 my-5'>
    <form>
        <label htmlFor="" className='fw-bold mb-2'>Phone :</label>
        <input id='Phone' type="tel" className='form-control'  />
        <label htmlFor="" className='fw-bold m-2'>City :</label>
        <input id='City' type="text" className='form-control'  />
        <label htmlFor="" className='fw-bold m-2'>Details :</label>
        <textarea id='details' type="text" className='form-control'></textarea>
        <div className='d-flex justify-content-between my-4 btn2'>
        <button onClick={SubmitPayment} type='button' className='btn btn-success bg2'> 
        {loading?<TailSpin
  height="50"
  width="50"
  color="balck"
  ariaLabel="tail-spin-loading"
  radius="3"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>:" Submit Cash Payement"}
       </button>  
        <button onClick={OnlinePayment} type='button' className='btn btn-success '> 
        {loading1?<TailSpin
  height="50"
  width="50"
  color="balck"
  ariaLabel="tail-spin-loading"
  radius="3"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>:" Submit Online Payement"}
       </button>  

        </div>


    </form>
</div>  
  </>
}
