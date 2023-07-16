import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {
  const [inputs,setInputs] =useState({username:'',email:'',password:''})
  const navigate =useNavigate()
  const handleChange =(e)=>{
    setInputs(prev=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }
  const handleRegister =async(e)=>{
  e.preventDefault()


  try {
    const response  = await axios.post('/register',{username:inputs.username,email:inputs.email,password:inputs.password})
    if(response.status === 201){
      toast.success('Successfully registered')
      setInputs({username:'',email:'',password:''})
      setTimeout(()=>{
        navigate('/login')
      },1000)
    
  }


} catch (error) {

  if(error.response){
    toast.error(error?.response?.data?.error)
  }
}
  }

  return (
    <div className="register_container">
      <form  className="form_container" onSubmit={handleRegister}>
        <div className="input_div">
          <label htmlFor="username">Username</label>
          <input type="username" value={inputs.username} name="username" id="username" onChange={handleChange}/>
        </div>
        <div className="input_div">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={inputs.email} id="email" onChange={handleChange}/>
        </div>
        <div className="input_div">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" value={inputs.password}  onChange={handleChange}/>
        </div>
        <button type="submit"className="btn_register"> Register</button>
        <ToastContainer position="bottom-center" theme="dark"/>
      </form>
    </div>
  );
};

export default Register;
