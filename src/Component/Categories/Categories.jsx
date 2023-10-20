import axios from 'axios'
import React from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function Categories() {
  function ALLCategories(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
 const {data,isLoading}= useQuery('AllCategory',ALLCategories)

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
  <div className='container py-5 text-center' >
    <div className='row gy-3'>
      {data?.data.data.map(function(category,index){return <div key={index} className='col-lg-4'>
        <Link to={`/categroyDatails/${category._id}`}>
        <div className='category1 mt-2'>
        <h5 className='main-color py-3 '>{category.name}</h5>
        <img src={category.image} width={"100%"} height={"400px"} alt="product" />
        <div className='detail text-center d-flex justify-content-center align-items-center'>
        </div>
      </div>
        </Link>
    
      </div> })}
    </div>
    
  </div>
  
  </>
}
