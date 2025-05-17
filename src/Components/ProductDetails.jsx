import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navi from './Navi';
import Footer from './Footer';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbHeartPlus } from "react-icons/tb";

function ProductDetails() {

  const location = useLocation();
  const item = location.state?.item;
  const [discount, setDiscount] = useState()

  const extractName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1)
  }
  const imageName = extractName(item.image_url);


  useEffect(() => {


    setDiscount(item.price * 1.4)

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
              <h1 className='text-success' style={{
                fontFamily: "PT Sans Narrow"
              }}>{item.name}</h1>
              <span>
                Seller's  Name
              </span>
              <div className='my-3'><span className='me-3' style={{
                fontSize: "20px",
                textDecoration: "line-through",
                color: "grey"
              }}><FaIndianRupeeSign />{discount}</span><span
                style={{
                  fontSize: "30px",
                  textAlign: "center",

                  color: "red"
                }}
              ><FaIndianRupeeSign /><span style={{
                fontWeight: "bold"
              }} >{item.price}</span></span></div>

              <h5 className='mt-3'>Description</h5>

              <span style={{
                fontSize: "13px"
              }}>{item.description}</span>
              <div className='d-flex justify-content-center mt-2'>
                <div style={{
                  alignSelf: "center",
                  border: "1px solid green",
                  width: "400px",
                  height: "200px",
                  borderRadius: "10px"

                }}>
                  <div className='p-4'>
                    <h6 >Quantity</h6>
                    <span>{item.quantity}</span>
                    <div className='d-flex justify-content-center'> <button className='btn  me-2'
                    style={{
                      color:"green",
                      border:"1px solid green"
                    }}
                    >Add to cart <TbShoppingCartPlus />
                    </button> <button className='btn '  style={{
                      color:"green",
                      border:"1px solid green"
                    }}>  Wishlist <TbHeartPlus /></button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetails