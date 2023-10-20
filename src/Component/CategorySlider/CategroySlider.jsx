import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
export default function CategroySlider() {
    function getAllCatgorey(){
         return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
     const {data,isLoading}= useQuery("AllCategory",getAllCatgorey)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 3,
        arrows:false
      };
      if(isLoading){
       return <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      }
  return <>
   <div className='mb-5'>
        <Slider {...settings}>
      {data?.data.data.map(function(category,inx){return <div key={inx}>
            <img style={{width:'100%', height:"200px"}} src={category.image} alt='slider'/>
            <h6 className='mt-3 main'>{category.name}</h6>
          </div>
     })}

         
        </Slider>
      </div>  
  
  
  </>
}
