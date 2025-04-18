import React, { useState } from 'react'
import Navi from './Navi'
import payment from "../assets/payment image.png"
import Footer from './Footer'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Checkout() {

  const navigate=useNavigate()
  
  

  const handlePayment = async(e)=>{
    
   toast.success("payment successful")
   navigate("/order")


  }

  return (
  <>
  <Navi/>
  
 
<div style={{
  backgroundColor:"#E4F5EC",
  height:"auto"
}} className='d-flex flex-column justify-content-center align-items-center m '>  <img style={{
  height:"60vh",
  padding:"20px"
}} src={payment} alt="" /> <button onClick={handlePayment} className='btn btn-success my-5'> PAY </button>
</div>  
<Footer/>
  
  </>
  )
}

export default Checkout