import React, { useState } from 'react'
import userPool from '../services/cognito/Userpool';
import { useNavigate } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Navi from './Navi';

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [showotp, setShowotp] = useState(false)
    const [otp, setOtp] = useState('');


    const onSubmit = (e) => {
        e.preventDefault();
        userPool.signUp(email, password, [], null, (err, data) => {
            if (err) {
                console.error(err)
            }
            if (data) {
                console.log(data)
                setShowotp(true)
                // navigate("/login")
            }

        })
    }


    const confirmmsg = (e) => {
        e.preventDefault();
        const user = new CognitoUser({
            Username: email,
            Pool: userPool,
        });

        user.confirmRegistration(otp, true, (err, result) => {
            if (err) {
                console.error('OTP verification failed:', err);
            } else {
                console.log('OTP verification successful:', result);
                navigate('/login'); // Redirect to login after verification
            }
        });

    }



    return (
       <>
       <Navi/>
        <div>
            
            <h1
                className='text-center my-5'
                style={{
                    fontSize: "50px",
                    fontFamily: "fantasy"
                }}
            > Sign Up</h1>

            {
                showotp ? (
                    <form action="" onSubmit={confirmmsg}>
                        <label>Enter OTP</label>
                        <input onChange={(e) => setOtp(e.target.value)} type="text" required />
                        <button type="submit">Verify OTP</button>
                    </form>
                ) :
                    (
                        <div className='d-flex justify-content-center '>
                            <form className='d-flex flex-column justify-content-center' action="" onSubmit={onSubmit}>
                                <div
                                    className='d-flex flex-column justify-content-center'
                                    style={{
                                        width: "200px"
                                    }}>
                                    <label 
                                    style={{
                                        fontSize: "25px",
                                        fontFamily: "-moz-initial"
                                    }} 
                                    htmlFor="">Email:</label>
                                    <input className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
                                    <label style={{
                                        fontSize: "25px",
                                        fontFamily: "-moz-initial"
                                    }} htmlFor="">Password:</label>
                                    <input className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
                                </div>
                                <button style={{
                                    fontSize:"25px",
                                    fontFamily:"-moz-initial"
                                }} className='btn btn-primary my-5' type='submit' >SignUp</button>
                                <a href="/login">already a user.Log in</a>
                            </form>
                            
                        </div>

                    )
            }


        </div>
        </>
    )
}

export default Signup


// import React, { useRef } from 'react'
// import { FormLabel, Button } from 'react-bootstrap'
// import { useState } from 'react'
// import { sign } from '../services/apicalls'
// import Navi from './Navi'


// function Signup() {

//     const [validatefname, setValidatefname] = useState(true)
//     const [validatesname, setValidatesname] = useState(true)
//     const [validatephone, setValidatephone] = useState(true)
//     const [validateemail, setValidateemail] = useState(true)
//     const [validatepassword, setValidatepassword] = useState(true)

//     const [user, setUser] = useState({
//         fname: "",
//         sname: "",
//         phone: "",
//         email: "",
//         password: ""

//     })

//     const formRef = useRef()

//     const signup = (e) => {
//         const { name, value } = e.target
//         if (name == "fname") {
//             if (!!value.match(/^[a-z A-Z.]{1,}$/)) {
//                 setUser({ ...user, [name]: value })
//                 setValidatefname(true)
//             }
//             else {
//                 setValidatefname(false)
//             }
//         }
//         else if (name == "sname") {
//             if (!!value.match(/^[a-z A-Z.]{1,}$/)) {
//                 setUser({ ...user, [name]: value })
//                 setValidatesname(true)
//             }
//             else {
//                 setValidatesname(false)
//             }

//         }
//         else if (name == "phone") {
//             if (!!value.match(/^[0-9+]{10,}$/)) {
//                 setUser({ ...user, [name]: value })
//                 setValidatephone(true)
//             }
//             else {
//                 setValidatephone(false)
//             }
//         }
//         else if (name == "email") {
//             if (!!value.match(/^[a-z0-9._]+@[a-z0-9]+.[a-z]{2,}$/)) {
//                 setUser({ ...user, [name]: value })
//                 setValidateemail(true)
//             }
//             else {
//                 setValidateemail(false)
//             }
//         }
//         else {
//             if (!!value.match(/^[a-zA-z0-9@$#.]{5,}$/)) {
//                 setUser({ ...user, [name]: value })
//                 setValidatepassword(true)
//             }
//             else {
//                 setValidatepassword(false)
//             }
//         }

//     }

//     const register = async (e) => {
//         if (validateemail && validatefname && validatephone && validatesname && validatepassword) {
//             e.preventDefault()
//             const result = await sign(user)
//             console.log(result)
//             if (result.status === 200) {
//                 toast.success("Sign up successfull!")
//                 setUser({
//                     fname: "",
//                     sname: "",
//                     phone: "",
//                     email: "",
//                     password: ""

//                 })
//                 formRef.current.reset()
//             }
//             else {
//                 toast.error(result.response.data)
//             }
//         }
//         else {
//             toast.warning("enter  valid values")
//         }

//     }
//     console.log(user)

//     return (
//         <>
//             <Navi />
//             <div style={{
//                 backgroundColor: "#d0f0c0",
//                 height: "100vh"
//             }} className=' d-flex justify-content-center'>
//                 <div style={{ width: "500px" }}>
//                     <h2
//                         className='mt-3 mb-3'
//                         style={{
//                             textAlign: "center",
//                             fontFamily: "Impact, fantasy"
//                         }}>Sign UP</h2>
//                     <div
//                         style={{
//                             height: "5px",
//                             backgroundColor: "black",
//                             width: "100%",
//                         }}
//                     ></div>
//                     <form className='d-flex justify-content-evenly' action="" ref={formRef}>
//                         <div className='mt-2' style={{
//                             width: "200px"
//                         }}>
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 FIRST NAME   <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 defaultValue={user.fname}
//                                 onChange={(e) => { signup(e) }}
//                                 name='fname'
//                                 id='fname'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             {
//                                 !validatefname &&
//                                 <div style={{ color: "red" }}>
//                                     Enter your First name !
//                                 </div>
//                             }
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 LAST NAME   <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 onChange={(e) => { signup(e) }}
//                                 name='sname'
//                                 id='sname'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             {
//                                 !validatesname &&
//                                 <div style={{ color: "red" }}>
//                                     Enter your Second name !
//                                 </div>
//                             }
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 PHONE NO <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 placeholder=''
//                                 onChange={(e) => { signup(e) }}
//                                 name='phone'
//                                 id='phone'

//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             {
//                                 !validatephone &&
//                                 <div style={{ color: "red" }}>
//                                     Enter your phone number !
//                                 </div>
//                             }
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 EMAIL <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 onChange={(e) => { signup(e) }}
//                                 name='email'
//                                 id='email'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             {
//                                 !validateemail &&
//                                 <div style={{ color: "red" }}>
//                                     Enter a Valid email !
//                                 </div>
//                             }
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 PASSWORD <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 type='password'
//                                 onChange={(e) => { signup(e) }}
//                                 name='password'
//                                 id='password'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             {
//                                 !validatepassword &&
//                                 <div style={{ color: "red" }}>
//                                     Enter password, minimum of 5 characters!
//                                 </div>
//                             }


                            


//                         </div>
//                         <div className='mt-2' style={{ width: "200px" }}>
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 Address Line <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 type='text'
//                                 onChange={(e) => { signup(e) }}
//                                 name='address'
//                                 id='address'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />

//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 CITY <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 type='text'
//                                 onChange={(e) => { signup(e) }}
//                                 name='city'
//                                 id='city'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 STATE <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 type='text'
//                                 onChange={(e) => { signup(e) }}
//                                 name='state'
//                                 id='state'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 COUNTRY <span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 type='text'
//                                 onChange={(e) => { signup(e) }}
//                                 name='country'
//                                 id='country'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                             <FormLabel
//                                 style={{
//                                     fontWeight: "bold",
//                                     fontSize: "15px",
//                                     fontFamily: "FreeMono, monospace"

//                                 }}
//                             >
//                                 PINCODE<span style={{
//                                     color: "red"
//                                 }}> *</span>
//                             </FormLabel>
//                             <br />
//                             <input
//                                 type='number'
//                                 onChange={(e) => { signup(e) }}
//                                 name='pincode'
//                                 id='pincode'
//                                 className='form-control'
//                                 style={{
//                                     height: "50px",
//                                     border: "2px solid "
//                                 }}

//                             />
//                         </div>
                        
//                     </form>
//                     <button
//                                 onClick={(e) => { register(e) }}
//                                 type='submit'
//                                 className='btn mt-3'
//                                 style={{
//                                     width: "100%",
//                                     backgroundColor: "grey",
//                                     color: "black",
//                                     border: "2px solid",
//                                     fontFamily: "FreeMono, monospace"
//                                 }}
//                             >
//                                 Sign Up!
//                             </button>
//                             <div
//                                 className='d-flex justify-content-center align-items-center'>
//                                 <a

//                                     className="custom-link mt-2"
//                                     href="/login">Already an User! Click here Login.
//                                 </a>

//                             </div>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default Signup