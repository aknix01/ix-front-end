import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navi from './Navi';
import Footer from './Footer';
import "../Components/product.css"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbHeartPlus } from "react-icons/tb";
import { addtocart } from '../services/apicalls';
import userPool from '../services/cognito/Userpool';
import { toast } from 'react-toastify';

function ProductDetails() {

  const location = useLocation();
  const item = location.state?.item;
  const [discount, setDiscount] = useState()
   const [idtoken, setIdtoken] = useState()
  
  
    const user = userPool.getCurrentUser()

  const extractName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1)
  }
  const imageName = extractName(item.image_url);

   const fetchTokens = async () => {
        user.getSession((err, session) => {
            if (err) {
                console.error("Error fetching session:", err);
            } else {

                // setAccessToken(session.getAccessToken().getJwtToken())
                // console.log("accesstoken", accessToken);
                setIdtoken(session.getIdToken().getJwtToken())

                // setRefreshToken(session.getRefreshToken().getToken())
                // console.log("refresh token", refreshToken);
            }
        });
    }
   const navcart = async (e) => {

        if (sessionStorage.getItem("Role")) {
            const data = {
                id: e.id,
                username: user.username,
                quantity: e.quantity
            }

            const Header = {
                "Authorization": idtoken
            }
            console.log(data)
            const result = await addtocart(data, "add", Header)
            console.log(result)
            if (result.success) {
                toast.success("added to cart")
            }
            else {
                toast.error("already added Or something went wrong")
            }
        }
        else {
            toast.warn("Please login ")
            navigate("/login")

        }

    }


  useEffect(() => {


    setDiscount(item.price * 1.4)
    fetchTokens()

  }, [])

  return (
    <>
      <Navi />
      <div className='' style={{
        backgroundColor: "#E4F5EC",
        height: "auto",
        paddingTop: "90px"
      }}>
        <div className='container'>
          <div className="row ">
            <div className=' my-5 col-lg-6  col-12 d-flex justify-content-center'><img style={{
              borderRadius: "20px",
              width: "400px",
              objectFit: "cover"
            }} src={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`} alt={item.name} /></div>
            <div className='col-6 my-5'>
             {/* Product Detail Component with properly positioned divs */}
<div className='d-flex justify-content-between align-items-start w-100'>
  {/* Product Info (Left Side) */}
  <div className="product-info">
    <h1 className='text-success' style={{
      fontFamily: "Archivo",
      fontWeight: 700
    }}>{item.name}</h1>
    <span style={{
                                            fontFamily:"Archivo",
                                            fontWeight:"500"
                                        }}>
      Seller's Name
    </span>
    <div className='my-3'>
      <span
      style={{
        fontSize: "20px",
        // textDecoration:"line-through",
        color: "grey",
        fontFamily:"Archivo"
      }}>MRP-

      </span>
      <span className='me-3' style={{
        fontSize: "20px",
        // textDecoration:"line-through",
        color: "grey",
        fontFamily:"Archivo"
      }}>
        <FaIndianRupeeSign />{discount}
      </span> 
      <br />
      <span
        style={{
          fontSize: "30px",
          textAlign: "center",
         color: "#D35400",
fontWeight: 700,
         fontFamily: "Archivo"
        }}
        className='mt-2'
      > Offer Price -
        <FaIndianRupeeSign />
        <span style={{
          fontWeight: "bold"
        }} >
          {item.price}
        </span>
      </span>
    </div>
  </div>

  {/* Quantity and Buttons (Right Side) */}
  <div className='mt-2'>
    {/* <div style={{
      border: "1px solid green",
      width: "400px",
      height: "200px",
      borderRadius: "10px"
    }}> */}
      <div className=''>
        {/* <h6>Quantity</h6>
        <span>{item.quantity}</span> */}
        <div className='d-flex justify-content-center '> 
          <button 
          onClick={(e)=>{navcart(item)}}
            className='btn btn-success me-2'
            style={{
              color: "white",
              border: "1px solid green"
            }}
          >
            Add to cart <TbShoppingCartPlus />
          </button> 
          {/* <button 
            className='btn'  
            style={{
              color: "green",
              border: "1px solid green"
            }}
          >  
            Wishlist <TbHeartPlus />
          </button> */}
        </div>
      </div>
    {/* </div> */}
  </div>
</div>
             
              <h5 className='mt-3'>Description</h5>

              <span style={{
                fontSize: "18px",
                color: "#333333",
lineHeight: "1.6",
fontFamily:"Archivo"
              }}>{item.description}</span>
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetails