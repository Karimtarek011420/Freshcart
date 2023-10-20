import React, { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Bars } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
    const{UpdataProduct,totalCartPrice,ClearProduct,Cartproducts,numOfCartItems,Deleteproduct}=useContext(CartContext)
    if(Cartproducts===null){
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
    if(Cartproducts.length===0){
      return <>
      <div className=' mx-auto py-5 my-5 product w-50 text-center'>
        <div>
          <h3>Cart Product Cleaned <Link to={"/products"} > <span className='main'> go to Products</span></Link></h3>
        </div>

      </div>
      </>
    }
  async function allDeleteProduct(id){
   const res = await  Deleteproduct(id)
   if(res.status==="success"){
    toast.success("Product had removed",{
      duration:1000, 
    })
  }else{
    toast.error("error")

  } 
    }
async function ClearProductCart(){
  await ClearProduct()
}
  async function UpdataProductitem(id,count){
     const res= await UpdataProduct(id,count);
     if(res.status==="success"){
      toast.success("Product had updataed",{
        duration:1000, 
      })
    }else{
      toast.error("error")
  
    }

  }

  return <>
<div className='container py-5 product  my-5'>
  <h2 className='main text-center'>shop Cart</h2>
  <h3 className='main text-center p-1'>Total Cart Price : {totalCartPrice}</h3>
  <h3 className='main text-center p-1'>Total Items : {numOfCartItems}</h3>
  <div className='d-flex justify-content-lg-between align-items-center p-5'>
  <button onClick={()=>ClearProductCart()} className='btn btn-outline-success mx-3'>Clear Cart</button>
  <Link to={"/payment"} className='btn btn-outline-success'>payment Cart</Link>

  </div>
  {Cartproducts.map(function(product,indx){
    return <div key={indx} className='row align-items-center py-5 border-bottom border-4'>
    <div className='col-md-1'>
      <img src={product.product.imageCover} className='w-100' alt="product" />
    </div>
    <div className='col-md-9'>
      <h4 className='h6 fw-bolder py-4'> title: {product.product.title}</h4>
      <p className='main'>Price: {product.price}</p>
      <i className="fa-solid fa-trash-can text-main"><button onClick={()=>allDeleteProduct(product.product.id)} className='mx-2 btn btn-outline-success'>remove</button></i>
    </div>
    <div className='col-md-2 py-2'>
      <button onClick={()=>UpdataProductitem(product.product.id,product.count+1)} className='btn btn-outline-success  p-3'>+</button>
      <span className='mx-2 text-black'>{product.count}</span>
      <button onClick={()=>UpdataProductitem(product.product.id,product.count-1)} className='btn btn-outline-success p-3'>-</button>
    </div>
  </div> })}
 
</div>  
  </>
}
