import axios from 'axios';
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';

export default function Allorders() {

const [Userorder, setUserorder] = useState(null)
    useEffect(() => {
       const x =jwtDecode(localStorage.getItem("tkn"));
       AllordersCart(x.id);
}, [])
async function AllordersCart(id){
    try {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        setUserorder(data);

    } catch (error) {
        console.log(error);
    }
}
if(Userorder===null){
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
  <div className=' container my-5 py-5 d-flex justify-content-center align-items-center'>
<div className='row gy-4'>
    {Userorder.map(function(order,inde){
        return   <div key={inde} className='col-md-6'>
            <div className='container    bg-primary-subtle'>
                <div className='row gy-2'>
                    {order.cartItems.map(function(item,index){
                        return <div className='col-md-4 '>
                            <div>
                                <img src={item.product.imageCover} className='w-100' alt={item.product.imageCover} />
                                <p className='my-2'>Title: {item.product.title.split(' ').slice(0,2).join()} </p>
                             <div className='d-flex justify-content-between main'>
                             <h5>Count: {item.count}</h5>
                                <h5>Price:{item.price} </h5>
                             </div>
                            </div>
                        </div>
                    })}

                </div>

            </div>
            <div className='p-2  bg-primary-subtle'>
                <h3 className='main text-center'>Order Sent to User</h3>
                <h4>City: <span className='main'>{order.shippingAddress.city}</span> </h4>
                <h5>Datials: <span className='main'>{order.shippingAddress.details}</span> </h5>
                <h5>Phone: <span className='main'>{order.shippingAddress.phone}</span> </h5>
                <h5>paymentMethodType: <span className='main'>{order.paymentMethodType}</span> </h5>
                <h5>totalOrderPrice: <span className='main'>{order.totalOrderPrice}</span> </h5>

            </div>
        </div>
    })}
  

</div>
  </div>
  
  </>
}
