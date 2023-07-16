import React from 'react'
import './loader.css'


const Loader = () => {
  return (
    <div className="spinner-container">
    <div v-if="loading" className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  )
}

export default Loader