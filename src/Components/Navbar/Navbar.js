import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
// import axios from '../../hooks/useAxiosPrivate'
import { AuthUser } from "../../context/AuthContext";
import axios  from "../../api/axios";
const Navbar = () => {
  const { auth,setAuth } = useContext(AuthUser);
  const navigate =useNavigate()

   const handleLogout =async()=>{
      setAuth({id:'',name:'',accessToken:''})
      try {
        await axios.get('/logout',{withCredentials:true})
        navigate('/home')
      } catch (error) {
        console.log(error)
      }
      
   }




  return (
    <div className="nav_container container">
      <div className="logo">
        <NavLink to="/">My <br/>toDo</NavLink>
      </div>
      <div className="nav_links">
        <ul>
          {!auth.name && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}

          {!auth.name && (
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          )}
          {auth.name && (
            <li>
              <p className="username">Hey.. {auth.name.toUpperCase()}</p>
            </li>
          )}
          {auth.name && (
            <li>
              <NavLink onClick={handleLogout}>Logout</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
