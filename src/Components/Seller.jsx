


import React, { useRef } from 'react'
import { FormLabel, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import userPool from '../services/cognito/Userpool'
import Navi from './Navi'
import { CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js'
import { TextField } from '@mui/material'
import Footer from './Footer'
import { toast } from 'react-toastify'



function Seller() {

  const [validatefname, setValidatefname] = useState(true)
  const [validatesname, setValidatesname] = useState(true)
  const [validatephone, setValidatephone] = useState(true)
  const [validateemail, setValidateemail] = useState(true)
  const [validateaddress, setValidateaddress] = useState(true)
  const [validatepincode, setValidatepincode] = useState(true)
  const [validatecountry, setValidatecountry] = useState(true)
  const [validatepassword, setValidatepassword] = useState(true)
  const [validatecpassword, setValidatecpassword] = useState(true)
  const [showotp, setShowotp] = useState(false)
  const [otp, setOtp] = useState('');

  const navigate = useNavigate()
  const [user, setUser] = useState({
    fname: "",
    sname: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    pincode: "",
    cpassword: "",
    password: ""

  })

  const formRef = useRef()

  const signUp = (e) => {
    const { name, value } = e.target
    if (name == "fname") {
      if (!!value.match(/^[a-z A-Z.]{1,}$/)) {
        const input = value
        const formatted = input
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setUser({ ...user, [name]: formatted })
        setValidatefname(true)
      }
      else {
        setValidatefname(false)
      }
    }
    else if (name == "sname") {
      if (!!value.match(/^[a-z A-Z.0-9]{1,}$/)) {
        
        setUser({ ...user, [name]: value })
        setValidatesname(true)
      }
      else {
        setValidatesname(false)
      }

    }
    else if (name == "phone") {
      if (!!value.match(/^[0-9+]{10,}$/)) {
        setUser({ ...user, [name]: value })
        setValidatephone(true)
      }
      else {
        setValidatephone(false)
      }
    }
    else if (name == "email") {
      if (!!value.match(/^[a-z0-9._]+@[a-z0-9]+.[a-z]{2,}$/)) {
        setUser({ ...user, [name]: value })
        setValidateemail(true)
      }
      else {
        setValidateemail(false)
      }
    }
    else if (name == "address") {
      if (!!value.match(/^[a-zA-Z0-9\s.,\n/-]{1,}$/)) {
        const input = value;
        const formatted = input.toUpperCase();
        setUser({ ...user, [name]: formatted })
        setValidateaddress(true)
      }
      else {
        setValidateaddress(false)
      }
    }
    else if (name == "pincode") {
      if (!!value.match(/^[a-z A-Z. 0-9]{1,}$/)) {
        setUser({ ...user, [name]: value })
        setValidatepincode(true)
      }
      else {
        setValidatepincode(false)
      }
    }
    else if (name == "password") {
      if (!!value.match(/^[a-zA-z0-9@$#.]{5,}$/)) {
        setUser({ ...user, [name]: value })
        setValidatepassword(true)
      }
      else {
        setValidatepassword(false)
      }
    }
    else if (name == "country") {
      if (!!value.match(/^[a-zA-z0-9 -]{3,}$/)) {
        const input = value
        const formatted = input
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        setUser({ ...user, [name]: formatted })
        setValidatepassword(true)
      }
      else {
        setValidatepassword(false)
      }
    }
    else {
      if (!!value.match(/^[a-zA-z0-9@$#.]{5,}$/)) {
        setUser({ ...user, [name]: value })
        setValidatecpassword(true)
      }
      else {
        setValidatecpassword(false)
      }


    }

  }

  const register = async (e) => {
     e.preventDefault()
    if (user.password == user.cpassword) {
      if (validateemail && validatefname && validatephone && validatesname && validateaddress && validatecountry && validatepincode && validatecpassword && validatepassword) {
       
        const attributeList = [];

        const fnameAttribute = new CognitoUserAttribute({
          Name: "custom:CompanyName",
          Value: user.fname,
        });

        const lnameAttribute = new CognitoUserAttribute({
          Name: "custom:RegistrationNumber",
          Value: user.sname,
        });

        const addressAttribute = new CognitoUserAttribute({
          Name: "custom:Address",
          Value: user.address,
        });

        const phoneNumberAttribute = new CognitoUserAttribute({
          Name: "custom:PhoneNumber",
          Value: user.phone, // E.164 format like +919876543210
        });
        const countryAttribute = new CognitoUserAttribute({
          Name: "custom:Country",
          Value: user.country, // E.164 format like +919876543210
        });
        const pincodeAttribute = new CognitoUserAttribute({
          Name: "custom:Pincode",
          Value: user.pincode, // E.164 format like +919876543210
        });
        const roleAttribute = new CognitoUserAttribute({
          Name: "custom:Role",
          Value: "Seller", 
        });


        attributeList.push(fnameAttribute, lnameAttribute, addressAttribute, phoneNumberAttribute, pincodeAttribute, countryAttribute,roleAttribute);

        userPool.signUp(user.email, user.password, attributeList, null, (err, data) => {
          if (err) {
            console.error(err);
            toast.error("email already in use or something went wrong")

          }
          if (data) {
            console.log(data);
            setShowotp(true);
          }
        });

      }
      else {
        toast.warn("enter  valid values")
      }
    }
    else {
      toast.warning("Both passwords must be same ")
    }

  }
  const confirmmsg = (e) => {
    e.preventDefault();
    const User = new CognitoUser({
      Username: user.email,
      Pool: userPool,
    });

    User.confirmRegistration(otp, true, (err, result) => {
      if (err) {
        console.error('OTP verification failed:', err);
        toast.error('OTP verification failed,Try Again')
      } else {
        console.log('OTP verification successful:', result);
        navigate('/login'); // Redirect to login after verification
      }
    });

  }
  console.log(user)

  return (
    <>
      <div style={{
        backgroundColor: "#E4F5EC"
      }}>
        <Navi className="mb-5" />

        {
          showotp ? (

            <div style={{

              paddingTop: "180px"
            }} className='d-flex flex-column  justify-content-center align-items-center '>
              <div style={{
                width: "40%",
                height: "40%",
                border: "2px solid black",
                borderRadius: "7px"
              }}>
                <h5 className='p-3'> Validate your account</h5>
                <div className='p-3' style={{
                  backgroundColor: "#E8E8E8"
                }}>
                  The OTP has been sent to {user.email}.Please enter the OTP you received to validate your account.
                </div>
                <form action="" className='d-flex flex-column form-control justify-content-center align-items-center' onSubmit={confirmmsg}>
                  <FormLabel
                    style={{
                      fontWeight: "500",
                      fontSize: "15px",
                      fontFamily: "Archivo"

                    }}
                    className='mt-5'
                  >
                    ENTER OTP   <span style={{
                      color: "red"
                    }}> *</span>
                  </FormLabel>

                  <TextField className='mb-5' required onChange={(e) => setOtp(e.target.value)} id="standard-basic" label="OTP" variant="standard" />
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      cursor: "pointer",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      transition: "background-color 0.3s ease",
                    }}
                    type="submit"
                    className='mb-3'
                  >Verify OTP</button>
                </form>

              </div>
            </div>
          ) :
            (<div style={{ paddingTop: "80px" }} className=' d-flex justify-content-center '>
              <div className=' d-flex flex-column justify-content-center align-items-center ' style={{ width: "100vw" }}>
                <h2
                  className='mt-3 mb-3 text-success'
                  style={{
                    textAlign: "center",
                    fontFamily: "Archivo"
                  }}>Join Our Business ....
                </h2>
                {/* <h5>Enter your details</h5> */}
                <div className='success'
                  style={{
                    height: "2px",
                    backgroundColor: "#198754",

                    width: "50%",
                  }}
                ></div>
                <form style={{
                  backgroundColor: "#E4F5EC"
                }} onSubmit={(e) => { register(e) }} className=' d-flex flex-column justify-content-center form-control' action="" ref={formRef}>

                  <div className='d-flex  flex-column justify-content-center align-items-centr'>
                    <div className=' d-flex justify-content-center row my-2'>
                      <div
                        className='col-lg-4 col-sm-12 my-1'>
                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Company Name   <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <input
                          required
                          defaultValue={user.fname}
                          onChange={(e) => { signUp(e) }}
                          name='fname'
                          id='fname'
                          placeholder='Company Name '
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid ",
                            fontFamily: "Archivo"

                          }}

                        />
                        {
                          !validatefname &&
                          <div style={{ color: "red" }}>
                            Enter your Comapny Name !
                          </div>
                        }

                      </div>
                      <div className='col-lg-4 col-sm-12 my-1'>
                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Registration Number
                          {/* <span style={{
                                   color: "red"
                               }}> *</span> */}
                        </FormLabel>
                        <br />
                        <input

                          onChange={(e) => { signUp(e) }}
                          name='sname'
                          id='sname'
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid ",
                            fontFamily: "Archivo"
                          }}
                          placeholder='Registration Number'

                        />
                        {
                          !validatesname &&
                          <div style={{ color: "red" }}>
                            Enter your Second name !
                          </div>
                        }
                      </div>
                    </div>

                    <div className='row my-2 d-flex justify-content-center'>
                      <div className='col-sm-12 col-lg-4 my-1'>
                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Email <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <input
                          required
                          placeholder='Email'
                          onChange={(e) => { signUp(e) }}
                          name='email'
                          id='email'
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid ",
                            fontFamily: "Archivo"
                          }}

                        />
                        {
                          !validateemail &&
                          <div style={{ color: "red" }}>
                            Enter a Valid email !
                          </div>
                        }


                      </div>
                      <div className='col-lg-4 col-sm-12 my-1'>
                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Phone Number <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <input
                          required
                          placeholder='Phone Number '
                          onChange={(e) => { signUp(e) }}
                          name='phone'
                          id='phone'

                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid ",
                            fontFamily: "Archivo"
                          }}

                        />
                        {
                          !validatephone &&
                          <div style={{ color: "red" }}>
                            Enter your phone number !
                          </div>
                        }

                      </div>
                    </div>

                    <div className='row d-flex justify-content-center'>
                      <div className='col-lg-8 col-sm-12 my-1'>

                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"


                          }}
                        >
                          Address <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <textarea
                      
                          onChange={(e) => { signUp(e) }}
                          required className='form-control' style={{
                            border: "2px solid black",
                            borderRadius: "5px",
                            padding: "10px",
                            fontFamily: "Archivo"
                            



                          }} placeholder='Enter your Address' name="address" id="address"></textarea>
                        {
                          !validateaddress &&
                          <div style={{ color: "red" }}>
                            Enter address, minimum of 5 characters!
                          </div>
                        }

                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-4 col-sm-12 my-1">
                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Country <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        {/* <Select options={options} value={value} onChange={(e) => { signUp(e) }} /> */}
                        <input
                          required
                          placeholder='Country'
                          type='text'
                          onChange={(e) => { signUp(e) }}
                          name='country'
                          id='country'
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid ",
                            fontFamily: "Archivo"
                          }}

                        />
                        {
                          !validatecountry &&
                          <div style={{ color: "red" }}>
                            Enter country
                          </div>
                        }


                      </div>
                      <div className="col-lg-4 col-sm-12 my-1">

                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Pincode<span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <input
                          required
                          placeholder='Pincode'
                          type='text'
                          onChange={(e) => { signUp(e) }}
                          name='pincode'
                          id='pincode'
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid ",
                            fontFamily: "Archivo"
                          }}

                        />

                        {
                          !validatepincode &&
                          <div style={{ color: "red" }}>
                            Enter valid pincode, minimum of 5 characters!
                          </div>
                        }
                      </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                      <div className="col-lg-4 col-sm-12 my-1">
                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Password <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <input
                          required
                          type='password'
                          onChange={(e) => { signUp(e) }}
                          name='password'
                          id='password'
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid "
                          }}

                        />
                        {
                          !validatepassword &&
                          <div style={{ color: "red" }}>
                            Enter password, minimum of 5 characters!
                          </div>
                        }

                      </div>
                      <div className="col-lg-4 col-sm-12 my-1">

                        <FormLabel
                          style={{
                            fontWeight: "500",
                            fontSize: "15px",
                            fontFamily: "Archivo"

                          }}
                        >
                          Confirm Password <span style={{
                            color: "red"
                          }}> *</span>
                        </FormLabel>
                        <br />
                        <input
                          required
                          type='password'
                          onChange={(e) => { signUp(e) }}
                          name='cpassword'
                          id='cpassword'
                          className='form-control'
                          style={{
                            height: "50px",
                            border: "2px solid "
                          }}

                        />
                        {
                          !validatecpassword &&
                          <div style={{ color: "red" }}>
                            Enter password, minimum of 8 characters!
                          </div>
                        }

                      </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button

                      type='submit'
                      className='btn mt-3 btn-success'
                      style={{
                        width: "50%",

                        color: "white",

                        fontFamily: "Archivo"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#28a745"; // Darker green
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#198754"; // Reset to default
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Sign Up!
                    </button>
                  </div>
                </form>

                <div
                  className='d-flex flex-column justify-content-center align-items-center mb-5'>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Archivo"
                    }}

                    className="custom-link mt-2 mb-"
                    href="/signup">Not a Merchant? <strong>Signup for Users</strong>
                  </a>
                  <a
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontFamily: "Archivo"
                    }}

                    className="custom-link mt-2 mb-5"
                    href="/login">Already an User? <strong>Login</strong>
                  </a>

                </div>
              </div>

            </div>)}
      </div>
      <Footer />
    </>
  )
}

export default Seller