import { createContext, useEffect, useState } from "react";



export const authContect= createContext();
  export function Authprovider({children}){
    const [token, settoken] = useState(null);
    useEffect(() => {
      if(localStorage.getItem('tkn')!==null){
        settoken(localStorage.getItem('tkn'))
      }
    }, [])
    
    return <authContect.Provider value={{token,settoken}}>
    
    {children}

    
    </authContect.Provider>
 }