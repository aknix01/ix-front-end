import React from 'react'
import log from '../services/cognito/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navi from './Navi';
import { TextField } from '@mui/material';
import Footer from './Footer';
import { toast } from 'react-toastify';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        log(email, password, (err, session) => {
            if (err) {
                toast.error("login failed")
            }
            else {
                toast.success('logged in ')
                console.log("user session", session)
                // user.getUserAttributes((err, attributes) => {
                //     const attrMap = {};
                //     attributes.forEach(attr => {
                //       attrMap[attr.getName()] = attr.getValue();
                //     });
                  
                //     // Store custom attributes locally
                //     localStorage.setItem("userAttributes", JSON.stringify(attrMap));
                //   });
                const role=localStorage.getItem("Role")
                if(role==="User"){
                    navigate("/")
                }
                else if(role==="Seller"){
                    navigate("/")
                }
                else if(role==="Admin"){
                    navigate("/")
                }
                else{
                    navigate("/")
                }
            }
        })
    }

  return (
   <>
   <Navi/>

<div className='d-flex flex-column align-items-center  justify-content-center '
style={{
    height:"90vh",
    backgroundColor:"#E4F5EC"
}}>
            
            <div 
            className='mt-5'
            style={{
                border:"",
                padding:"20px",
                borderRadius:"20px",
                width:"400px",
                backgroundColor:"#E2DBDD"
               

            }}>
                <h1 className='my-3'
                style={{
                    fontSize: "40px",
                    fontFamily:  "Lilita One",
                    margin:"",textAlign:"center"
                }}>Login</h1>
                <h6 style={{
                    textAlign:"center",
                    fontFamily:"monospace"
                }} >Hey, Enter Your details to get sign in to your account</h6>
            <form className='d-flex flex-column justify-content-center  m-4 ' action="" onSubmit={handleLogin}>
                {/* <label style={{
                    fontSize: "25px",
                    fontFamily: "-moz-initial"
                }} htmlFor="">Email:</label> */}
                <TextField  className='my-2 mx-3 '  onChange={(e) => setEmail(e.target.value)} type='email' required id="outlined-basic" label=" Enter your Email" variant="outlined" />
                {/* <input required className='form-control my-3'  type="email" /> */}
                {/* <label style={{
                    fontSize: "25px",
                    fontFamily: "-moz-initial"
                }} htmlFor="">Password:</label> */}
                {/* <input required className='form-control my-3'  type="passaword" /> */}
                <TextField className='mt-4  mb- mx-3'  required id="outlined-basic" onChange={(e) => setPassword(e.target.value)} label=" Enter your password" type='password' variant="outlined" />
                <a style={{
                    textDecoration:"none",
                    color:"",
                    fontSize:"10px"
                }} className='my-3 mx-3' href="/forgotpassword">Forgot Password ?</a>
                <button  style={{
                    width:"240px",
                    margin:"auto",
                    backgroundColor:"#E154AF",
                    fontFamily:"sans-serif",
                    fontWeight:"bold"
                }} className='btn mt-3 ' type='submit' >Login</button>
                <a style={{
                    textDecoration:"none",
                    color:"black"
                }} className='my-3' href="/signup">Don't have an account ? <strong>Register Now</strong></a>

               
            </form>
            </div>
        </div>
        <Footer/>
   
   
   </>
  )
}

export default Login
