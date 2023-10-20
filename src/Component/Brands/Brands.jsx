import axios from 'axios'
import React from 'react'
import { Bars } from 'react-loader-spinner';
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';

export default function Brands() {
  function ALLbrands(){
     return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  const {data,isLoading}=useQuery("ALLbrands",ALLbrands);
  if(isLoading){
    return <>
    <div  className=' vh-100 d-flex justify-content-center align-items-center'>
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
      {data?.data.data.map(function(brand,inde){return <div key={inde} className='col-lg-3'>
        <Link to={`/brandDatails/${brand._id}`}>
        <div className=' brand mt-2 product'>
        <h5 className='main-color py-3 '>{brand.name}</h5>
        <img src={brand.image} width={"100%"} height={"400px"} alt={brand.name} />
      </div>
        </Link>
    
      </div> })}
    </div>
    
  </div>
  </>
}
