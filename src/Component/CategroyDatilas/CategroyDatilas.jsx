import axios from 'axios'
import React from 'react'
import { Bars } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

export default function CategroyDatilas() {
     const{id}=useParams()
    function AllCategroyDatilas(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    }
    const{data,isLoading}=useQuery("AllCategroyDatilas",AllCategroyDatilas);
    console.log(data?.data.data);
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
  return<>
   <div className='container py-5 text-center w-75 m-auto'>
    <div className='catgroy product'>
    <h3 className='main-color p-3'>{data?.data.data.name}</h3>
    <img  className= "w-25" src={data?.data.data.image} alt={data?.data.data.name}/>
    </div>


  </div>
  
  
  </>
}
