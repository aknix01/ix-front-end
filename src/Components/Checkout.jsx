import React, { useEffect, useState } from 'react'
import Navi from './Navi'
import payment from "../assets/payment image.png"
import Footer from './Footer'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import userPool from '../services/cognito/Userpool';
import { Ordering } from '../services/apicalls';



function Checkout() {

  const navigate = useNavigate()
  const [cartlist, setCartlist] = useState()
  const [price, setPrice] = useState()
  const user = userPool.getCurrentUser()
  const [address, SetAddress] = useState('')

  const handlePayment = async (e) => {


    e.preventDefault();

    

    
    console.log(address)
    
      const body = {
        userId: user.getUsername(),
        items: JSON.parse(localStorage.getItem("cartItems")),
        totalAmount: JSON.parse(localStorage.getItem("TotalAmouunt")),
        Address: localStorage.getItem("Address"),
        orderStatus: "processing",
        placedAt: new Date().toISOString()
      };
      const result = await Ordering(body)
      console.log(result.data)
      console.log(body,address)
    





    toast.success("payment successful")
    navigate("/order")


  }
  
  useEffect(() => {
    setCartlist()
    setPrice()
    user.getSession((err, session) => {
      if (err || !session.isValid()) {
        console.error("Session invalid", err);
        return;
      }

      user.getUserAttributes((err, attributes) => {
        if (err) {
          console.error("Failed to get attributes", err);
          return;
        }

        const attrMap = {};
        attributes.forEach(attr => {
          attrMap[attr.getName()] = attr.getValue();
        });

        console.log()
        localStorage.setItem("Address",attrMap["custom:Address"] || "" );





        // Proceed with sending `body` to your backend
      });
    });
    

  }, [])


  return (
    <>
      <Navi />


      <div style={{
        backgroundColor: "#E4F5EC",
        height: "auto",
        paddingTop: "80px"
      }} className='d-flex flex-column justify-content-center align-items-center m '>  <img style={{
        height: "60vh",
        padding: "20px"
      }} src={payment} alt="" /> <button onClick={handlePayment} className='btn btn-success my-5'> PAY </button>
      </div>
      <Footer />

    </>
  )
}

export default Checkout