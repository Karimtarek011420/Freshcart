import React from 'react'
import { useContext } from 'react'
import { authContect } from '../../Context/authiccotext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouter({children}) {
    const {token}=useContext(authContect);
    if(token===null){
        return <Navigate to="/login"/>
    }
  return <>

  {children}
  
  
  </>
}
