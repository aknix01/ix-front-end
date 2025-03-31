import React from 'react'
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
 
function Navi() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [navdrop, setNavdrop] = useState(false)
    const navigate=useNavigate()

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };
    
    return (
        <Navbar expand="lg" className="custom-navbar ">
            <Container>
                <Navbar.Brand
                    style={{
                        color: "#FFFFFF",
                        fontSize: "30px",
                        fontFamily: "fantasy",
                        letterSpacing: '3px',
                        marginRight: "20px"

                    }} href="#home" >Brand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav mx-5 d-flex flex-column ">
                    <Nav className=" w-100 d-flex justify-content-evenly align-items-center custom-navl ">
                        <Nav.Link href="#home">Home</Nav.Link>

                        <Nav.Link

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


                        <Nav.Link href="/addproducts">Add Products</Nav.Link>
                        <Nav.Link href="#home">link3</Nav.Link>




                        <NavDropdown
                            style={{
                                fontSize: "30px"
                            }}

                            className="custom-dropdown"
                            title={<div className='d-flex flex-column justify-content-center'>
                                <span><span style={{
                                    color: "white",
                                    fontSize: "40px",
                                    padding: "0px"
                                }} className="material-symbols-outlined">
                                    account_circle
                                </span>
                                    <div style={{
                                        fontSize: "20px"
                                    }}>
                                    </div></span>
                            </div>} id="basic-nav-dropdown" show={showDropdown}
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >

                            <NavDropdown.Item href="/signup">Create Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="login">
                                Sign In
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout} >Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/addtocart"><FaCartShopping /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default Navi