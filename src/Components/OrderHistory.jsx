import React, { useEffect, useState } from 'react'
import userPool from '../services/cognito/Userpool'
import { delOrders, fetchOrders } from '../services/apicalls'
import Navi from './Navi'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./order.css"
import Footer from './Footer';

function OrderHistory() {

  const user = userPool.getCurrentUser()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([])
  const [idtoken, setIdtoken] = useState("")

  const fetch = async () => {
    const Header = {
      "Authorization": idtoken
    }
    const result = await fetchOrders(user.username)
    if (result.success) {
      setOrders(result.data.orders);
      setProduct(result.data.orders.items)

      console.log(orders)
    } else {
      console.error("Error fetching orders:", result.error);
    }
    setLoading(false);
    // console.log(result.data.orders)
    console.log(product)
    console.log(user.username)


  }

  const deleteorder = async (orderId,userId) => {
    // const result=
    const id = orderId
    
    const user = userId
    console.log(id,user)
    const Header = {
      "Authorization": idtoken
    }
    const result = await delOrders(id, user, Header)
    if (result.success) {
      fetch()
    }

  }

  const extractName = (url) => {
    return url.substring(url.lastIndexOf("/") + 1)

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
  console.log(idtoken)


  useEffect(() => {
    fetch()
    fetchTokens()

  }, [])

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
      <div style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "#E4F5EC",
        height: "auto",
        display: window.innerWidth >= 992 ? 'block' : 'none'

      }}>

        <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
          <div className="header">
            <div>
              <h1 style={{
                fontFamily: "Archivo",
                fontWeight: "500"
              }} className='text-success ' >My Orders</h1>
            </div>
          </div>

          {orders?.length > 0 ?
            orders?.map((item) => (
              <div className="containerdiv my-2 ">


                <div className="content">


                  <div className="order-item">
                    <div className="order-header">
                      <div className="order-number">Order Id: <span>{item.orderId}</span></div>
                      <div className="order-date">Order Placed : {new Date(item.placed_at).toLocaleDateString()}</div>

                    </div>

                    {
                      item.items?.map((product) => {

                        const imageName = extractName(product.image_url)
                        return (


                          <div className="product-item ">
                            <div className="product-image">
                              <img src={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`} alt="product image" />
                            </div>
                            <div className="product-details">
                              <div className="product-title">{product.name}</div>
                              {/* <div className="product-designer">By: Milly Thomas</div> */}
                              <div className="product-meta">
                                <div>
                                  <span className="product-size">Category : {product.category}</span>
                                  <span className="product-qty">Qty : {product.quantity}</span>
                                </div>
                                <div className="product-price mx-5">Rs.{product.price}</div>
                              </div>
                            </div>
                            <div className="status-section">
                              <div className="status-label">Status</div>
                              <div className="status transit">{item.order_status}</div>
                            </div>
                            <div className="delivery-section">
                              <div className="delivery-label">Delivery Expected by</div>
                              <div className="delivery-date">{item.estimatedDelivery ? item.estimatedDelivery : 'delivery date will be updated'}</div>
                            </div>
                          </div>

                        )
                      })
                    }


                    <div className="order-footer">
                      <button className="track-button">
                        <i className="track-icon">📦</i> TRACK ORDER
                      </button>
                      <button onClick={() => { deleteorder(item.orderId,item.userId) }} className="cancel-button">
                        <i className="cancel-icon">✕</i> CANCEL ORDER
                      </button>

                      <div>
                        <div className="order-payment">Paid using credit card ending with 7345</div>
                        <div className="order-total">Rs.{item.totalAmount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            :
            <div className='text-success' style={{
              paddingTop: "80px",
              paddingBottom: "80px",
              backgroundColor: "#E4F5EC",
              height: "90vh",
              fontSize: "50px",

              fontFamily: "Archivo",
              display: window.innerWidth >= 992 ? 'block' : 'none'
            }} >No orders !! ,
           <a style={{
            textDecoration:"none",
            fontSize:"40px"
           }} href="/products"> click here to  View Products</a> </div>}

        </div>





      </div >
      <div
        style={{
          paddingTop: "80px",
          backgroundColor: "#E4F5EC",
          height: "auto",
          display:
            window.innerWidth < 992 ? 'block' : 'none'

        }}>

        <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
          <div className="header">
            <div>
              <h1 className='text-success text-align' >My Orders</h1>
            </div>
          </div>
          {orders?.length > 0 ?
            orders?.map((item) => (
              <div

                key={item.orderId}
                style={{

                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  margin: '10px 0',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  width: '90%',
                  boxSizing: 'border-box',
                  backgroundColor: "white"
                }}
              >
                <div style={{
                  fontWeight: '',
                  color: '#178125',
                  fontFamily: "Archivo",
                }}>Order Id: {item.orderId}</div>
                <div style={{
                  color: '#178125',
                  fontFamily: "Archivo",
                  fontWeight: ''
                }}>Order Placed: {new Date(item.placed_at).toLocaleDateString()}</div>

                {item.items?.map((product, index) => {
                  const imageName = extractName(product.image_url)
                  return (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: window.innerWidth < 600 ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                        borderTop: '1px solid #eee',
                        paddingTop: '10px',
                        width: '100%',
                      }}
                    >
                      {/* Product Image */}
                      <img
                        src={`https://d3cceuazvytzw7.cloudfront.net/uploads/${imageName}`}
                        alt={product.name}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />

                      {/* Product Details */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: 'bold',
                          fontSize: "30px",
                          fontFamily: "Archivo"
                        }}>{product.name}</div>
                        <div style={{
                          fontSize: "15px",
                          fontFamily: "Archivo"
                        }}>Category: {product.category}</div>
                        <div style={{
                          fontSize: "15px",
                          fontFamily: "Archivo"
                        }}>Qty: {product.quantity}</div>
                        <div style={{
                          fontSize: "15px",
                          fontFamily: "Archivo"
                        }}>Rs. {product.price}</div>
                      </div>

                      {/* Order Status */}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: 'bold',
                          fontFamily: "Archivo", textAlign: "center"
                        }}>Status</div>
                        <div style={{
                          color: '#178125',
                          fontFamily: "Archivo",
                          fontWeight: "500",
                          fontSize: "25px"
                        }}>{item.order_status}</div>
                      </div>

                      {/* Delivery Info */}
                      <div style={{ flex: 1 }}>
                        <div className='' style={{
                          fontWeight: 'bold',
                          fontFamily: "Archivo"
                        }}>Delivery Expected by</div>
                        <div style={{
                          fontWeight: '',
                          fontFamily: "Archivo", textAlign: "center"
                        }}>
                          {item.estimatedDelivery
                            ? item.estimatedDelivery
                            : ' date will be updated'}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Footer Actions */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 600 ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '10px'
                  }}
                >
                  <div style={{
                    fontWeight: '',
                    fontFamily: "Archivo"
                  }}>
                    Paid using credit card ending with 7345
                  </div>
                  <div style={{ fontWeight: 'bold' }}>Rs. {item.totalAmount}</div>
                  <button
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontFamily: "Archivo",
                      fontSize: "12px"
                    }}
                  >
                    📦 TRACK ORDER
                  </button>
                  <button
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#f44336',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontFamily: "Archivo",
                      fontSize: "12px"
                    }}
                    onClick={() => { deleteorder(item.orderId,item.userId) }}
                  >
                    ✕ CANCEL ORDER
                  </button>
                </div>
              </div>
            ))
          :<div className='text-success' style={{
              paddingTop: "80px",
              paddingBottom: "80px",
              backgroundColor: "#E4F5EC",
              height: "70vh",
              fontSize: "20px",

              fontFamily: "Archivo",
              display: window.innerWidth < 992 ? 'block' : 'none'
            }} >No orders !! ,
           <a style={{
            textDecoration:"none",
            fontSize:"20px"
           }} href="/products"> click here to  View Products</a> </div>}




        </div>





      </div >

      <Footer className="mt-5" />


    </>

  )
}

export default OrderHistory