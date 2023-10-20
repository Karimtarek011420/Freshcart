import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Products from './Component/Products/Products'
import Login from './Component/Login/Login'
import Categories from './Component/Categories/Categories'
import Brands from './Component/Brands/Brands'
import Notfound from './Component/NotFound/Notfound'
import Register from './Component/Register/Register'
import Forgetpass from './Component/Forgetpass/Forgetpass'
import Profile from './Component/Profile/Profile'
import { Authprovider } from './Context/authiccotext'
import ProtectedRouter from './Component/Protect/Protect'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDatails from './Component/ProductDatails/ProductDatails'
import BrandsDatails from './Component/Branddatails/BrandDatails'
import CategroyDatilas from './Component/CategroyDatilas/CategroyDatilas'
import { CartContextProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Cart from './Component/Cart/Cart'
import PaymentCash from './Component/PaymentCash/PaymentCash'
import Allorders from './Component/Allorders/Allorders'

 const Myrouter= createBrowserRouter([
  {path:"/",element:<Layout/>,children:[
    {index:true,element:<ProtectedRouter><Products/></ProtectedRouter> },
    {path:"products",element:<ProtectedRouter><Products/></ProtectedRouter>},
    {path:"forgotpass",element:<Forgetpass/>},
    {path:"brands",element:<ProtectedRouter>  <Brands/></ProtectedRouter> },
    {path:"allorders",element:<ProtectedRouter><Allorders/></ProtectedRouter> },
    {path:"cart",element:<ProtectedRouter><Cart/></ProtectedRouter> },
    {path:"profile",element:<ProtectedRouter><Profile/></ProtectedRouter>},
    {path:"brandDatails/:id",element:<ProtectedRouter><BrandsDatails/></ProtectedRouter>},
    {path:"categroyDatails/:id",element:<ProtectedRouter><CategroyDatilas/></ProtectedRouter>},
    {path:"productdatails/:id",element:<ProtectedRouter><ProductDatails/></ProtectedRouter>},
    {path:"payment",element:<ProtectedRouter><PaymentCash/></ProtectedRouter>},
    {path:"login",element:<Login/>},
    {path:"Register",element:<Register/>},
    {path:"categories",element:<ProtectedRouter> <Categories/></ProtectedRouter>},
    {path:"*",element:<Notfound/>},
  ]}
])
export default function App() {
  const Queryproducts= new QueryClient()
  return <>
  <QueryClientProvider client={Queryproducts}>
  <CartContextProvider>
  <Authprovider>
  <RouterProvider router={Myrouter}/>
  </Authprovider>
  </CartContextProvider>
  <Toaster/>
  </QueryClientProvider>
  </>
}
