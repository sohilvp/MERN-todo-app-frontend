import  { useContext, useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import useRefesh from '../../hooks/useRefresh'
import { AuthUser } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import   Loader from '../Loader/Loader'


const PersistLogin = () => {
  const refresh = useRefesh()
  const {auth} = useContext(AuthUser)
  const [isLoading,setIsloading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    let isMounted = true
    const verifyRefreshToken =async()=>{
      try {
        await refresh()
        
      } catch (error) {
        navigate('/home')
      }finally{
        isMounted && setIsloading(false)
      }
    }
    !auth?.accessToken ? verifyRefreshToken(): setIsloading(false)

    return ()=> isMounted=false
  },[auth])


  return (
    isLoading ? <Loader/>: <Outlet/>
  )
}

export default PersistLogin
