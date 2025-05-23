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
import { Box, TextField, InputAdornment, Button, Menu, MenuItem } from "@mui/material";
import { NavItem } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";

function Navi() {

    const [showDropdown, setShowDropdown] = useState(false);
    const [navdrop, setNavdrop] = useState(false)
    const navigate = useNavigate()
     const [search,setSearch]=useState("")
    const [cartItemCount, setCartItemcount] = useState(0)
    const storedCount = Number(sessionStorage.getItem("cartItemCount")) || 0;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        logout();
        sessionStorage.clear()
        setAnchorEl(null);
        navigate('/');
    };

    const handleSignup = () => {
        navigate("/signup")
        setAnchorEl(null);
    }
    const handleLogin = () => {
        navigate("/login")
        setAnchorEl(null);
    }
    const handleOrders = () => {
        navigate("/orders")
        setAnchorEl(null);
    }


    const [role, setRole] = useState()
    const [dataUser, setDataUser] = useState({});
    const [usercheck, setUsercheck] = useState()


    useEffect(() => {
        setUsercheck(userPool.getCurrentUser())
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
                        // console.log(userData)
                        setDataUser(userData)
                        // console.log(dataUser)

                    });
                }
            });
        }



        setRole(sessionStorage.getItem("Role"))
       
        
        


    }, [])
    useEffect(()=>{
        setCartItemcount(storedCount);
    },[storedCount])

    useEffect(() => {
        // console.log("Updated state:", dataUser);
    }, [dataUser]);
    console.log(cartItemCount)
    console.log(sessionStorage.getItem("cartItemCount"))
    return (
        <div className='py-3 fixed-top ' style={{
            backgroundColor: "#E4F5EC",

        }}>
            <Navbar style={{
    borderRadius: "20px"
}} expand="lg" className="custom-navbar fixed-top mt-3 mx-2">
    <Container>
        <Navbar.Brand
            style={{
                color: "#000000",
                fontSize: "25px",
                fontFamily: "PT Sans Narrow",
                marginRight: "20px"
            }} 
            href="/">Freshcart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {/* Left side navigation links */}
            <Nav className="me-auto">
                <Nav.Link
                className='mx-3'
                    style={{
                        fontSize: "20px",
                         textAlign: "center",
                        fontFamily:"PT Sans Narrow"
                    }} 
                    href="/">Home</Nav.Link>

                <Nav.Link
                className='mx-3'
                    style={{
                        fontSize: "20px",
                         textAlign: "center",
                        fontFamily:"PT Sans Narrow"
                    }}
                    onMouseEnter={() => setNavdrop(true)}
                    onMouseLeave={() => setNavdrop(false)}
                    href="/products">Products</Nav.Link>

                {(role === "Admin" || role === "Seller") && (
                    <Nav.Link 
                    className='mx-3'
                        style={{
                            fontSize: "20px",
                             textAlign: "center",
                            fontFamily:"PT Sans Narrow"
                        }} 
                        href="/addproducts">Add Products</Nav.Link>
                )}

                {(role === "Admin") && (
                    <Nav.Link 
                    className='mx-3'
                        style={{
                            fontSize: "20px",
                             textAlign: "center",
                        }} 
                        href="/management">Management</Nav.Link>
                )}
                
                {(role === "Admin" || role === "Seller") && (
                    <Nav.Link 
                    className='mx-3'
                    
                        style={{
                            fontSize: "20px", 
                            textAlign: "center",
                            fontFamily:"PT Sans Narrow"
                        }} 
                        href="/recievedorders">Orders</Nav.Link>
                )}
            </Nav>
            
            {/* Right side search and icons - moved to the end */}
            <div className='d-flex align-items-center ms-auto'>
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
                        <button 
                            className='btn btn-success d-flex' 
                            style={{
                                borderRadius: "20px",
                            }}
                        ><FaSearch /></button>
                    </Box>
                </NavItem>

                <Nav.Link
                    style={{
                        fontSize:"22px"
                    }}
                    className="position-relative d-inline-flex align-items-center mx-2"
                    href="/addtocart">
                    <div className="position-relative">
                        {cartItemCount > 0 && (
                            <span
                                className="position-absolute bg-danger text-white rounded-circle d-flex justify-content-center align-items-center"
                                style={{
                                    fontSize: '0.7rem',
                                    width: '20px',
                                    height: '20px',
                                    top: '-10px',
                                    right: '-7px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {cartItemCount}
                            </span>
                        )}
                        <FaCartShopping />
                    </div>
                </Nav.Link>
                
                {/* <Nav.Link href="/addtocart"><FaHeart /></Nav.Link> */}
                
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <div style={{
                                fontSize: "10px",
                                color: "black"
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
                        </div>
                    </Button>
                    <Menu
                        style={{
                            color: "AppWorkspace"
                        }}
                        className='m-0'
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {!usercheck && (
                            <MenuItem 
                                style={{
                                    margin: "0px"
                                }} 
                                onClick={handleLogin}>Log in</MenuItem>
                        )}
                        {!usercheck && (
                            <MenuItem 
                                style={{
                                    width: "100px", 
                                    padding: "auto"
                                }} 
                                onClick={handleSignup}>Sign up</MenuItem>
                        )}
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                        <MenuItem onClick={handleOrders}>Orders</MenuItem>
                    </Menu>
                </div>
            </div>
        </Navbar.Collapse>
    </Container>
</Navbar>
        </div>

                        
    )
}

export default Navi
