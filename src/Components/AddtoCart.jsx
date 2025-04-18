import React from 'react'
import  {  useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navi from './Navi';
import { fetchcart, incrementQuantity,decrementQuantity } from '../services/apicalls';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { removefromcart } from '../services/apicalls';
import { IoTrashBin } from "react-icons/io5";
import { FormLabel } from 'react-bootstrap';
import userPool from '../services/cognito/Userpool';
import { toast } from 'react-toastify';

function AddtoCart() {

    const [cartlist, setCartlist] = useState([]);
    const [price,setPrice]=useState();
    const [quantity,setQuantity]=useState();
    const navigate=useNavigate();

    const user = userPool.getCurrentUser()

    const check=async()=>{
        navigate("/checkout")
    }
    const cart = async () => {
        const body= {
            username:user.username
        }
        
        const result = await fetchcart(body)
        

        if (result.status == 200) {
            const parsedBody = typeof result.data.body === "string" ? JSON.parse(result.data.body) : result.data.body;
            if (parsedBody && Array.isArray(parsedBody.products)) {
                setCartlist(parsedBody.products);  // ✅ Store only the products array
                console.log(parsedBody.products);  // ✅ Logs only the array
                
                
            } 

        }
        else {
            toast.error("fetching cart failed")
        }
    }

    const del = async (item) => {
        console.log(item)
        
        const result = await removefromcart(item.id,user.username)
        console.log(result)
        if (result.status == 200) {
            cart()
            toast.success("removed from cart")
        }
    }


    const incre = async (item) => {
        const data = {
            quantity: item.quantity+1 ,
            productId:item.id,
            userId:user.username
        }
        console.log( data)
        const result = await incrementQuantity(data,"increment")
        console.log(result)
        if (result.status == 200) {
           
            cart()
            // totalquantity()
            // totalprice()
        }
        else {
            toast.error("failed to do ")
        }
    }
    const decre = async (item) => {
        const data = {
            quantity: item.quantity-1 ,
            productId:item.id,
            userId:user.username
        }
        const result = await decrementQuantity(data, "decrement")
        console.log(result)
        if (result.status == 200) {
           
            cart()
            totalquantity()
            totalprice()
        }
        else {
            toast.error("failed to do ")
        }
    }

    // const totalquantity=async()=>{
    //     const result =await quantitycount()
    //     console.log(result)
    //     setQuantity(result.data)
    // }
   
    
      

    console.log(cartlist)

    useEffect(() => {
         cart()
        // totalquantity()
        
        
    }, [])
    useEffect(() => {
        const totalPrice = cartlist.reduce((acc, item) => {
            const itemTotal = item.quantity * item.price;
            return acc + itemTotal;
          }, 0);
          
          console.log("Total Price:", totalPrice);
          setPrice(totalPrice)
       
       
   }, [cartlist])

  return (
  <>
  <Navi/>

{cartlist?.length > 0 ?
            
        
            <div className='row px-4 '
            style={{
                minHeight:"700px",
                 backgroundColor: "#E4F5EC"
            
            }}
            >
                <div className="col -8">

                    <table
                        className="table table-striped container mt-5"
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            overflow: "hidden",
                        }}
                    >
                        <thead
                            style={{
                                backgroundColor: "#f8f9fa",
                                color: "#333",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            <tr>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "12px",
                                    }}
                                    className="tdclass"
                                >
                                    #
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "12px",
                                    }}
                                    className="tdclass"
                                >
                                    Product Image
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "12px",
                                    }}
                                    className="tdclass"
                                >
                                    Title
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "12px",
                                    }}
                                >
                                    Price
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "12px",
                                    }}
                                >
                                    Quantity
                                </th>
                                <th
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "12px",
                                    }}
                                >
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartlist?.map((item, index) => (
                                <tr
                                    key={index}
                                    style={{
                                        textAlign: "center",
                                        verticalAlign: "middle",
                                    }}
                                >
                                    <td
                                        className="tdclass"
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                        }}
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                        }}
                                        className="classtd"
                                    >
                                        <img
                                            style={{
                                                width: "150px",
                                                height: "80px",
                                                objectFit: "cover",
                                                borderRadius: "4px",
                                            }}
                                            // src={`${base_url}/upload/${item.cover}`}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                        }}
                                        className="classtd"
                                    >
                                        {item.name}
                                    </td>
                                    <td
                                        className="classtd"
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            color: "#28a745",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        ${item.price}
                                    </td>
                                    <td
                                        className="classtd"
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "10px",
                                            }}
                                        >
                                            <button
                                                onClick={() => { incre(item) }}
                                                className="btn btn-outline-primary btn-sm"
                                                style={{
                                                    borderRadius: "50%",
                                                    width: "30px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <FaPlus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button

                                                onClick={() => { decre(item) }}
                                                className="btn btn-outline-danger btn-sm"
                                                style={{
                                                    borderRadius: "50%",
                                                    width: "30px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <FaMinus />
                                            </button>
                                        </div>
                                    </td>
                                    <td
                                        className="classtd"
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: "10px",
                                            color: "#28a745",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <button
                                            onClick={() => del(item)}
                                            className="btn btn-outline-danger btn-sm"
                                            style={{
                                                borderRadius: "50%",
                                                width: "30px",
                                                height: "30px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <IoTrashBin />
                                        </button>

                                    </td>
                                </tr>
                            ))
                          
}
                        </tbody>
                    </table>

                </div>
                <div className="col-3 mt-5 mx-5 "
                style={{
                    backgroundColor:"#E4F5EC"
                   }}> 
                     <div
                        className='card'
                        style={{
                            alignSelf:"center",
                            width: "400px",
                            height: "400px"
                        }}
                    >
                        <h3
                            className='mt-2 ms-3'
                            style={{
                                fontFamily: "fantasy",
                                letterSpacing: "2px",
                                color: "#607B7E"

                            }}
                        >Price Details</h3>

                        <div
                            style={{
                                color: "",
                                border: "1px solid #607B7E"
                            }}
                        >

                        </div>

                       <FormLabel
                        className='mt-4 ms-3'
                        style={{
                            fontFamily: "monospace",
                            color: "#967569",
                            fontWeight:"bold"

                        }}
                       >
                            Total Items:
                       </FormLabel>
                       <span
                       className='mt-2 ms-3'
                       style={{
                        fontSize:"30px"
                       }}>{cartlist.length}</span>

                        <span
                            className='mt-4 ms-3'
                            style={{
                                fontFamily: "monospace",
                                color: "#967569",
                                fontWeight:"bold"


                            }}>Total Price:</span>
                            
                            <span
                            className='mt-4 ms-3'

                            style={{
                                fontSize:"30px"
                               }}
                            >₹{price}</span>
                        <div
                            className='mt-5'
                            style={{
                                color: "",
                                border: "1px dotted  #607B7E"
                            }}
                        >

                        </div>
                        <button

                            onClick={
                                ()=>{check()}
                            }
                               

                            className='mt-2'
                            style={{
                                alignSelf: "center",
                                backgroundColor: "#007BFF", // Primary blue color
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
                                e.target.style.backgroundColor = "#0056b3"; // Darker blue on hover
                                e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)"; // Enhance shadow on hover
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = "#007BFF"; // Revert to original blue
                                e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // Revert shadow
                            }}
                        >
                            CHECK OUT
                        </button>



                    </div>
                </div>

            </div>
       :<div
       className='d-flex flex-column justify-content-center align-items-center'
       style={{
        minHeight:"500px",
        fontFamily:"fantasy",
        fontSize:"40px"
       }}>Oops.....THe CART IS Empty
      
        <a 
        style={{
            
            fontFamily:"fantasy",
            fontSize:"30px",
            textDecoration:"none"
    
           }}
        href="/products">View products</a>
        </div>
       
        

        }
  </>
  )
}

export default AddtoCart