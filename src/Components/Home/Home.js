import React, { useEffect, useState } from "react";
import cover from "../../assets/coverimg.png";
import { BsCircleSquare } from "react-icons/bs";
import "./home.css";
import { Link } from "react-router-dom";
const Home = () => {
  

  
  return (
    
    <div className="home_container">
      <div className="home_section__left">
        <p>
          <span className="home_span">
            ″You can always change your plan, but only if you have one. I’m a
            big believer in to-do lists.
          </span>
        </p>

        <span className="auther">
          <BsCircleSquare /> Randy Pausch
        </span>
        <Link to={'/login'}><button className="btn_home">Login</button></Link>
      </div>
      <div className="home_section__right">
        <img src={cover} alt="" />
      </div>
    </div>
  )
};

export default Home;
