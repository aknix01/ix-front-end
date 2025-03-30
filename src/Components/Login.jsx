import React from 'react'
import log from '../services/cognito/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navi from './Navi';
import { TextField } from '@mui/material';
import { Amplify, Logger } from 'aws-amplify';
import awsconfig from './aws-exports';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const logger = new Logger('AmplifyLogger', 'DEBUG');

    const handleLogin = (e) => {
        e.preventDefault();
        logger.debug('Amplify logging enabled');
        log(email, password, (err, session) => {
            if (err) {
                alert("login failed")
            }
            else {
                alert('logged in ')
                console.log("user session", session)
                navigate("/dash")

            }
        })
    }

  return (
   <>
   <Navi/>

<div className='d-flex flex-column align-items-center  justify-content-center '
style={{
    height:"90vh",
    backgroundColor:"#d0f0c0"
}}>
            <h1 className='m'
                style={{
                    fontSize: "50px",
                    fontFamily: "fantasy",
                    margin:""
                }}>Log In</h1>
            <div style={{
                border:"1px solid black",
                padding:"20px",
                borderRadius:"5px",
                width:"300px"

            }}>
            <form className='d-flex flex-column justify-content-center  ' action="" onSubmit={handleLogin}>
                {/* <label style={{
                    fontSize: "25px",
                    fontFamily: "-moz-initial"
                }} htmlFor="">Email:</label> */}
                <TextField className='my-2'  onChange={(e) => setEmail(e.target.value)} type='email' required id="outlined-basic" label=" Enter your Email" variant="outlined" />
                {/* <input required className='form-control my-3'  type="email" /> */}
                {/* <label style={{
                    fontSize: "25px",
                    fontFamily: "-moz-initial"
                }} htmlFor="">Password:</label> */}
                {/* <input required className='form-control my-3'  type="passaword" /> */}
                <TextField className='mt-2 mb-3'  required id="outlined-basic" onChange={(e) => setPassword(e.target.value)} label=" Enter your password" type='password' variant="outlined" />

                <button  style={{
                    width:"120px",
                    margin:"auto"
                }} className='btn btn-primary' type='submit' >login</button>
                <a className='my-3' href="/signup">didn't have an account .register</a>
            </form>
            </div>
        </div>
   
   
   </>
  )
}

export default Login
