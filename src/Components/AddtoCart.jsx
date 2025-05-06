import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navi from './Navi';
import { fetchcart, incrementQuantity, decrementQuantity } from '../services/apicalls';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { removefromcart } from '../services/apicalls';
import { IoTrashBin } from "react-icons/io5";
import { FormLabel } from 'react-bootstrap';
import userPool from '../services/cognito/Userpool';
import { toast } from 'react-toastify';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { Box, CircularProgress } from '@mui/material';
import Footer from './Footer';
import "./cart.css"

function AddtoCart() {

    const [cartlist, setCartlist] = useState([]);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [idtoken,setIdtoken]=useState("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const user = userPool.getCurrentUser()

    const check = async () => {
        localStorage.setItem("TotalAmouunt", JSON.stringify(price));
        

        navigate("/checkout")


    }
    const cart = async () => {
        const body = {
            username: user.username
        }

        const Header = {
            "Authorization": idtoken
        }

        const result = await fetchcart(body)


        if (result.success) {
            const parsedBody = typeof result.data.body === "string" ? JSON.parse(result.data.body) : result.data.body;
            if (parsedBody && Array.isArray(parsedBody.products)) {
                setCartlist(parsedBody.products);  // ✅ Store only the products array
                console.log(parsedBody.products);  // ✅ Logs only the array


            }

        }
        else {
            toast.error("fetching cart failed")
        }
        setLoading(false);
    }

    const del = async (item) => {
        console.log(item)
        const Header = {
            "Authorization": idtoken
        }

        const result = await removefromcart(item.id, user.username,Header)
        console.log(result)
        if (result.success) {
            cart()
            toast.success("removed from cart")
        }
    }


    const incre = async (item) => {
        const data = {
            quantity: item.quantity + 1,
            productId: item.id,
            userId: user.username
        }
        const Header = {
            "Authorization": idtoken
        }
        console.log("increment")
        const result = await incrementQuantity(data, "increment",Header)
        console.log(result)
        if (result.success) {

            cart()
            // totalquantity()
            // totalprice()
        }
        else {
            toast.error("failed to do ")
        }
    }
    const decre = async (item) => {
        console.log("decrement")
        if (item.quantity <= 1) {
            toast.error("Minimum quantity is 1");
            return;
        }
        const data = {
            quantity: item.quantity - 1,
            productId: item.id,
            userId: user.username
        }
        const Header = {
            "Authorization": idtoken
        }
        const result = await decrementQuantity(data, "decrement",Header)
        console.log(result)
        if (result.success) {

            cart()
            // totalquantity()
            // totalprice()
        }
        else {
            toast.error("failed to do ")
        }
    }
    const fetchTokens = async () => {
        user.getSession((err, session) => {
            if (err) {
                console.error("Error fetching session:", err);
            } else {

              
                setIdtoken(session.getIdToken().getJwtToken())
               
            }
        });
    }


    const extractName = (url) => {
        return url.substring(url.lastIndexOf("/") + 1)
    }


    console.log(cartlist)

    useEffect(() => {
        cart()
        // totalquantity()


    }, [])


    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartlist));


    }, [cartlist])
    useEffect(() => {
        const totalPrice = cartlist.reduce((acc, item) => {
            const itemTotal = item.quantity * item.price;
            return acc + itemTotal;
        }, 0);

        console.log("Total Price:", totalPrice);
        setPrice(totalPrice)


    }, [cartlist])

    useEffect(()=>{
        fetchTokens()

    },[])

    console.log("idtoken", idtoken);
                
    if (loading) return <div>
        <Navi />
        <div style={{
            paddingTop: "80px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100dvh",
            backgroundColor: "#E4F5EC"
        }}>
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        </div>
        <Footer />
    </div>;

    return (
        <>
            <Navi />

            {cartlist?.length > 0 ?




                <div className='row d-flex justify-content-center   px-4  '
                    style={{
                        minHeight: "700px",
                        backgroundColor: "#E4F5EC",
                        paddingTop: "80px"

                    }}
                >
                    <div className=' col-lg-6 col-sm-12 mt-5 '>
                        {cartlist?.map((item, index) => {

                            const imageName = extractName(item.image_url);

                            return (
                                <div
                                    key={item.id}
                                    className="cart-item d-flex align-items-center justify-content-between p-2 mb-3"
                                    aria-label={`Cart item: ${item.name}`}
                                >
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`}
                                            alt={`${item.name} product image`}
                                            className="cart-item-image me-5"
                                        />
                                        <span className="item-name fw-medium mx-3">{item.name}</span>
                                    </div>

                                    <div className="item-price text-primary fw-semibold">
                                        {item.price}
                                    </div>

                                    <div className="d-flex align-items-center">
                                        <div className="quantity-controls d-flex align-items-center me-5">
                                            <button
                                                onClick={() => decre(item)}
                                                className="btn quantity-btn"
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >
                                                <FaCaretDown />
                                            </button>

                                            <span className="quantity-display mx-2" aria-live="polite">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => incre(item)}
                                                className="btn quantity-btn"
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >
                                                <FaCaretUp />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => del(item)}
                                            className="btn delete-btn"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <IoTrashBin />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}


                    </div>



                    <div className="col-lg-4 mx-5 col-sm-12 mt-5 mb-5 "
                        style={{
                            backgroundColor: "#E4F5EC"
                        }}>
                        <div
                            className='card d-flex justiy-content-center'
                            style={{
                                alignSelf: "center",
                                width: "400px",
                                height: "400px",
                                backgroundColor: "#E4F5EC",
                                border: "1px solid rgb(135, 206, 168)",
                                boxShadow: " 6px 6px 4px rgba(13, 107, 60, 0.1)",
                                borderRadius: "20px"
                            }}
                        >
                            <h3
                                className='mt-4 ms-3'
                                style={{
                                    fontFamily: " Roboto, sans-serif",
                                    fontWeight: "bold",
                                    color: "black"

                                }}
                            >Order Summary</h3>


                            <div className='d-flex justify-content-between align-items-center'>
                                <FormLabel
                                    className='mt-4 ms-3'
                                    style={{
                                        fontFamily: 'Roboto, sans-serif',
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "20px"

                                    }}
                                >
                                    Total Items:
                                </FormLabel>
                                <span
                                    className='mt-2 mx-5'
                                    style={{
                                        fontSize: "20px",
                                        textAlign: "center"
                                    }}>{cartlist.length}</span>
                            </div>


                            <div className='d-flex justify-content-between align-items-center'>
                                <span
                                    className='mt-4 ms-3'
                                    style={{
                                        fontFamily: "Roboto, sans-serif",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "20px"


                                    }}>Total Price:</span>

                                <span
                                    className='mt-4 mx-5'

                                    style={{
                                        fontSize: "20px"
                                    }}
                                >₹{price}</span>

                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span
                                    className='mt-4 ms-3'
                                    style={{
                                        fontFamily: "Roboto, sans-serif",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "20px"


                                    }}>Devilery Charge:</span>

                                <span
                                    className='mt-4 mx-5'

                                    style={{
                                        fontSize: "20px"
                                    }}
                                >₹0</span>

                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span
                                    className='my-4 ms-3'
                                    style={{
                                        fontFamily: "Roboto, sans-serif",
                                        color: "black",
                                        fontWeight: "bold",
                                        fontSize: "20px"


                                    }}>Amount to Pay:</span>

                                <span
                                    className='mt-4 mx-5'

                                    style={{
                                        fontSize: "20px"
                                    }}
                                >{price}</span>

                            </div>

                            <button

                                onClick={
                                    () => { check() }
                                }


                                className='mt-2'
                                style={{
                                    alignSelf: "center",
                                    backgroundColor: "#5DCF2F", // Primary blue color
                                    color: "#fff", // White text
                                    border: "none", // Remove border
                                    borderRadius: "8px", // Rounded corners
                                    padding: "12px 24px", // Padding for a comfortable size
                                    fontSize: "16px", // Font size
                                    fontWeight: "bold", // Bold text
                                    cursor: "pointer", // Pointer cursor on hover
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
                                    transition: "all 0.3s ease", // Smooth transition
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = "#9CCA8A"; // Darker blue on hover
                                    e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)"; // Enhance shadow on hover
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = "#5DCF2F"; // Revert to original blue
                                    e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // Revert shadow
                                }}
                            >
                                CHECK OUT
                            </button>



                        </div>
                    </div>

                </div>

                : <div
                    className='d-flex flex-column justify-content-center align-items-center'
                    style={{
                        minHeight: "500px",
                        fontFamily: "fantasy",
                        fontSize: "40px"
                    }}>Oops.....THe CART IS Empty

                    <a
                        style={{

                            fontFamily: "fantasy",
                            fontSize: "30px",
                            textDecoration: "none"

                        }}
                        href="/products">View products</a>
                </div>



            }
            <Footer />
        </>
    )
}

export default AddtoCart