import React from 'react'
import Navbar from './Navbar'
import img1 from '../Assets/dashboard.png'
import '../Styles/Dashboard.css'
const HomePage = () => {
  return (
    <div className='Home'>
      <Navbar></Navbar>
    <div className="section-container">
    <div className="hero-section">
      <div className="text-section mx-4">
        <h1 className="text-title w-500 text-green-900 font-poppins text-4xl font-bold">
        Re-Eco
        </h1>
        <h2 className='text-3xl font-bold mt-4 text-green-600'>
        Recycle Your E-Waste Responsibly
        </h2>
        <p className="font-semibold text-xl my-8">
        ReEco: Your premier destination for responsible electronics disposal. GreenCycleHub offers a convenient platform for individuals and businesses to recycle electronics responsibly. Join us in creating a greener, cleaner future. 
        </p>
      </div>
      <div className="hero-image-section">
        <img className="hero-image1" src={img1} alt="img" />
      </div>
    </div>
    </div>
  </div>

  )
}

export default HomePage
