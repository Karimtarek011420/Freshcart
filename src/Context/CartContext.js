import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartContext=createContext();
export function CartContextProvider({children}){
const [Cartproducts, setCartproducts] = useState(null)
const [numOfCartItems, setnumOfCartItems] = useState(0)
const [totalCartPrice, settotalCartPrice] = useState(0)
const [Cartid, setCartid] = useState(null)
async function AddtoCart(ProductId){
    try{
        const{data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/cart",{
            "productId":ProductId
        },
        {
            headers:{token:localStorage.getItem("tkn")}
        });
        getlogCart()
        return data;
    } 
     catch(e){
        console.log("error",e);
    }
};
async function getlogCart(){
    try {
       const {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
        headers:{token:localStorage.getItem("tkn")}
       })
       setCartproducts(data.data.products)
        setnumOfCartItems(data.numOfCartItems)
        settotalCartPrice(data.data.totalCartPrice)
        setCartid(data.data._id)
    } catch (error) {
        console.log("error",error);
    }
}
async function Deleteproduct(productId){
    try {
       const {data}  = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:{token:localStorage.getItem("tkn")}
                 })
                 setCartproducts(data.data.products)
                 setnumOfCartItems(data.numOfCartItems)
                 settotalCartPrice(data.data.totalCartPrice)
                 return data 
    } catch (error) {
        console.log("error",error);
    }
}
async function ClearProduct(){
    try {
 await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
    headers:{token:localStorage.getItem("tkn")}
})
                setCartproducts([])
                 setnumOfCartItems(0)
                 settotalCartPrice(0)

      
    } catch (error) {
              console.log("error",error);

    }
  }
async function UpdataProduct(productId,count){
  try {
    const{data} =await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
        "count": count
    },{
        headers:{token:localStorage.getItem("tkn")}

    })
    setCartproducts(data.data.products)
    setnumOfCartItems(data.numOfCartItems)
    settotalCartPrice(data.data.totalCartPrice)
    return data 
  } catch (error) {
    console.log("error",error);

  }
}

useEffect(() => {
    getlogCart()
}, [])


return <CartContext.Provider value={{settotalCartPrice,setnumOfCartItems,setCartproducts,ClearProduct,UpdataProduct,Deleteproduct,AddtoCart,Cartid,Cartproducts,numOfCartItems,totalCartPrice}}>
    {children}
    
    </CartContext.Provider>
}