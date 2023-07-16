import  { useContext } from 'react'
import { AuthUser } from "../context/AuthContext";
import axios from '../api/axios';
const useRefresh = () => {
    const {setAuth } =useContext(AuthUser)
    const refresh =async()=>{
            const response =await axios.get('/refresh',{headers:{'Content-Type':'application/json'},withCredentials:true})

             setAuth( {
                    id:response.data.id,
                    name:response.data.name,
                    accessToken: response.data.accessToken
              
            })
            
        return response?.data?.accessToken;
    }
    
  return refresh
}

export default useRefresh