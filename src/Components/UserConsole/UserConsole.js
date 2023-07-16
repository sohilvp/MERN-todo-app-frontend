import React, { useContext, useEffect, useState } from "react";
import "./userconsole.css";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  useAxiosPrivate  from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../../context/AuthContext";


const UserConsole = () => {

  const {auth} = useContext(AuthUser)
  const axiosPrivate =useAxiosPrivate()
  const [todos,setTodos] =useState([])
  const [input,setInput]=useState('')
  const [isLoad,setIsLoad]=useState(false)
  const [newtodo,setNewtodo]  = useState('')
  const navigate = useNavigate()


  const handleSubmit =async(e)=>{
    e.preventDefault()
    if(!input){
      toast.error('Write something...')
    }
    if(input){
      setIsLoad(true)
      const response = await axiosPrivate.post(`post/${auth.id}`,{title:input},{withCredentials:true})
      const done = response?.data?.message
      setNewtodo (done)
      setInput('')
    }
  }
  const handleDelete =async(e,id)=>{
    
    e.preventDefault()
      const response = await axiosPrivate.delete(`post/${id}`,{withCredentials:true})
      const done = response?.data?.message
      setNewtodo(done)
    
  }
  
  useEffect(()=>{
    let isMounted = true;
    const fetchTodos =async()=>{

      try {
        
        const response = await axiosPrivate.get(`/post/${auth.id}`)
        const data =response?.data
        isMounted && setTodos(data.todos)
        setIsLoad(false)
        
        
      } catch (error) {

        console.log(error.response.data.error)
        if(error.response?.status === 403){
          navigate('/login')
        }
        
      }
    }
    
    fetchTodos();
  
    return () => {
      isMounted = false
      setNewtodo('')    
    }
  },[newtodo])

  
  
  return (
    <div className="console_container">
      <div className="todo_form">
        <form className="form_container" onSubmit={handleSubmit}>
        <h2>Write todo here</h2>
          <div className="input_div">
            <input type="todo" name="todo" id="todo" value={input} onChange={e=> setInput(e.target.value)}/>
            
          </div>
          <button
            type="submit"
            name="password"
            id="password"
            className={isLoad?"btn_add  disable":"btn_add"}
          >
            Add
          </button>
          <ToastContainer position="bottom-center" theme="dark"/>
        </form>
      </div>
      <div className="todo_container">
        {todos.length === 0 ? <p className="notodo">no to-do found</p> :todos
          .map((x) => {
            return <div className="single_todo" key={x._id} >
            <div className="options">
              <AiOutlineDelete className="deleteButton" onClick={(e) => handleDelete(e, x._id)} />
            </div>
            <div className="todo_text">
              <p>{x.title}</p>
            </div>
          </div>
          })
          .reverse()}
          
      </div>
    </div>
  );
};

export default UserConsole;
