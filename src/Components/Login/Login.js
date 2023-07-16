import React, { useContext, useState } from "react"
import axios from '../../api/axios'
import "./login.css"
import { useNavigate} from 'react-router-dom' 
import { AuthUser } from "../../context/AuthContext"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Login = () => {

  const {setAuth } = useContext(AuthUser)
  const [inputs,setInputs] =useState({email:'',password:''})
  const navigate = useNavigate() 

  const handleChange =(e)=>{
    setInputs(prev=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }

  const handleLoginSubmit =async(e)=>{
      e.preventDefault()
      try {
        const response = await axios.post('/auth',{email:inputs.email,password:inputs.password},{headers: { 'Content-Type': 'application/json' },withCredentials:true})
        const accessToken =response?.data?.accessToken
        const name =response?.data?.user?.username
        const id =response?.data?.user?._id
        setAuth({id,name,accessToken})
        navigate('/')
      } catch (error) {
        if(error.response)
        console.log(error.response.data.error)
        toast.error(error?.response?.data?.error)
      }
    
  }


  return (
    <div className="login_container">
      <form onSubmit={handleLoginSubmit} className="form_container">
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} />
        </div>
        <div className="input_div">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id="password" onChange={handleChange} />
        </div>
        <button
          type="submit"
          className="btn_login"
        >
          Login
        </button>
        <ToastContainer position="bottom-center" theme="dark"/>
        
      </form>
    </div>
  )
}

export default Login
