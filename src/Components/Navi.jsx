import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navi.css"
import { useState } from 'react';
import { AiFillProduct } from "react-icons/ai";

import { logout } from '../services/cognito/logout';
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import userPool from '../services/cognito/Userpool';
import { FaHeart } from "react-icons/fa";
import { Box, TextField,InputAdornment, Button } from "@mui/material";
import { NavItem } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

function Navi() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [navdrop, setNavdrop] = useState(false)
    const navigate = useNavigate()


    const handleLogout = () => {
        logout();
        localStorage.clear()
        navigate('/');
    };
    const [role, setRole] = useState()
    const [dataUser, setDataUser] = useState({});

    useEffect(() => {
        const user = userPool.getCurrentUser()
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    console.error("Session error:", err);
                    return;
                }

                if (session.isValid()) {
                    user.getUserAttributes((err, attributes) => {
                        if (err) {
                            console.error("Error fetching attributes:", err);
                            return;
                        }

                        const userData = {};
                        attributes.forEach(attr => {
                            userData[attr.getName()] = attr.getValue();
                        });
                        console.log(userData)
                        setDataUser(userData)
                        console.log(dataUser)

                    });
                }
            });
        }



        setRole(localStorage.getItem("Role"))


    }, [])

    useEffect(() => {
        console.log("Updated state:", dataUser);
    }, [dataUser]);
    return (
        <div className='p-3' style={{
            backgroundColor:"#E4F5EC"
           }}>
            <Navbar style={{

                borderRadius: "20px"
            }} expand="lg" className="custom-navbar  mx-5 ">
                <Container>
                    <Navbar.Brand
                        style={{
                            color: "#000000",
                            fontSize: "20px",
                            fontFamily: 'Roboto, sans-serif',
                            
                            marginRight: "20px"

                        }} href="/" >Freshcart</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav mx-5 d-flex flex-column ">
                        <Nav className=" w-100 d-flex justify-content-evenly align-items-center custom-navl ">
                            <Nav.Link
                                style={{
                                    fontSize: "15px"
                                }} href="/">Home</Nav.Link>

                            <Nav.Link
                                style={{
                                    fontSize: "15px"
                                }}

                                onMouseEnter={() => setNavdrop(true)}
                                onMouseLeave={() => setNavdrop(false)}

                                href="/products">Products <AiFillProduct /> </Nav.Link>
                            {/* {navdrop && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    width: "100%",
                                    left: "0",
                                    background: "rgba(255, 255, 255, 0.2)",
                                    backdropFilter: "blur(5px)",
                                    padding: "10px",
                                    borderRadius: "5px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                hiii
                            </div>
                        )} */}


                            {(role === "Admin" || role === "Seller") && (
                                <Nav.Link style={{
                                    fontSize: "15px"
                                }} href="/addproducts">Add Products</Nav.Link>
                            )}

                            {(role === "Admin") && (
                                <Nav.Link style={{
                                    fontSize: "15px"
                                }} href="/management">Management</Nav.Link>
                            )

                            }





                            <Nav.Link ></Nav.Link>
                            <NavItem>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    p={2}
                                    sx={{ maxWidth: 400 }}
                                >
                                    <input

                                        style={{ backgroundColor: "white", borderRadius: "20px" }}
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Search..."
                                        size="small"
                                        className='form-control'
                                    />
                                    {/* <Button 
                                      
                                        size="small"
                                        sx={{
                                            
                                           
                                            right: 10,
                                            transform: 'translateY(-50%)',
                                            borderRadius: '20px',
                                            textTransform: 'none',
                                            padding: '4px 12px',
                                        }}
                                    >
                                        Search
                                    </Button> */}
                                    <button  className='btn btn-success d-flex ' style={{
                                        borderRadius:"20px",
                                        
                                    }}> <FaSearch /></button>
                                </Box>
                            </NavItem>

                            <Nav.Link href="/addtocart"><FaCartShopping /></Nav.Link>
                            <Nav.Link href="/addtocart"><FaHeart /></Nav.Link>

                            
                            <NavDropdown
                                style={{
                                    fontSize: "30px"
                                }}

                                className="custom-dropdown"
                                title={<div className='d-flex flex-column justify-content-center align-items-center'>
                                    <div style={{
                                        fontSize: "10px"
                                    }}>
                                        {dataUser["custom:FirstName"]}
                                    </div>
                                    <span style={{
                                        color: "black",
                                        fontSize: "30px",
                                        padding: "0px"
                                    }} className="material-symbols-outlined">
                                        account_circle
                                    </span>

                                </div>} id="basic-nav-dropdown" show={showDropdown}
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >


                                <NavDropdown.Item href="/signup">Create Account</NavDropdown.Item>
                               
                            <NavDropdown.Item href="/login">
                                    Sign In
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

                        
    )
}

export default Navi
