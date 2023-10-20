import axios from 'axios'
import { useContext, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function ProductDatails() {
  const {AddtoCart}= useContext(CartContext)
  const [sendloading, setsendloading] = useState(false)
  const {id}= useParams();
 async function productcontext(id){
  setsendloading(true)
    const res= await AddtoCart(id);
    if(res.status==="success"){
      toast.success(res.message,{
        duration:500, 
      })
    }else{
      toast.error("error")
  
    } 
    setsendloading(false)

  }
 
    function ALLproductdatails(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
   const{data,isLoading} = useQuery("alloruductdatilas",ALLproductdatails);
   if(isLoading){
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
<div className='container py-5'>
    <div className='row justify-content-center align-items-center'>
        <div className='col-md-4' >
            <div className='image product my-4'>
                <img className='w-100' src={data?.data.data.imageCover} alt="" />
            </div>
        </div>
        <div className='col-md-8'>
                <h4 className='fw-bold'>{data?.data.data.title.split(' ').slice(0,10).join()}</h4>
                <h5 className='py-3'>{data?.data.data.description.split(' ').slice(0,20).join()}</h5>
                <p className='main'>{data?.data.data.category.name}</p>
                <div className='d-flex justify-content-between align-items-center px-2'>
          <p>{data?.data.data.price} <span className='main'>EGP</span> </p>
          <p><span><i class="fa-solid fa-star rating-color"></i> {data?.data.data.ratingsAverage}</span></p>
        </div>
        <button onClick={()=> productcontext(data?.data.data.id)} className='form-control btn1 text-white'>
          {sendloading?  <div className='d-flex justify-content-center align-items-center'>
            <Bars
    height="40"
    width="40"
    color="#fff"
    ariaLabel="bars-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
          </div>: "+ Add to Card"} </button>
              

            </div>

    </div>
</div>  
  
  </>
}
