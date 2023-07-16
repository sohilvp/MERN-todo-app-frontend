import  { useContext, useEffect } from 'react'
import useRefresh from '../hooks/useRefresh'
import { AuthUser } from '../context/AuthContext'
import {axiosPrivate} from '../api/axios'

const useAxiosPrivate = () => {
    const refresh = useRefresh()
    const {auth} =useContext(AuthUser)
    useEffect(()=>{
        const requsetIntercept = axiosPrivate.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                    
                }
                return config;
            },(error)=>Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use((response)=>{
            return response
        },
            async(error)=>{
                const preRequest =error?.config
                
                if(error?.response?.status === 403 && !preRequest?.sent){
                    
                    preRequest.sent = true
                    const newAccessToken = await refresh()
                    
                    preRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(preRequest)
                }
                return Promise.reject(error)
            }
        );

        return ()=>{
            axiosPrivate.interceptors.request.eject(requsetIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    },[auth,refresh])
  return axiosPrivate
  
}

export default useAxiosPrivate