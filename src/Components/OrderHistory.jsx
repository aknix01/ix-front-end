import React, { useEffect, useState } from 'react'
import userPool from '../services/cognito/Userpool'
import { fetchOrders } from '../services/apicalls'
import Navi from './Navi'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./order.css"

function OrderHistory() {

  const user = userPool.getCurrentUser()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([])

  const fetch = async () => {
    const result = await fetchOrders(user.username)
    if (result.success) {
      setOrders(result.data.orders);
      setProduct(result.data.orders.items)

      console.log(orders)
    } else {
      console.error("Error fetching orders:", result.error);
    }
    setLoading(false);
    console.log(result.data.orders)
    console.log(product)
    console.log(user.username)


  }

  useEffect(() => {
    fetch()

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
  </div>;

  return (
    <>
      <Navi />
      <div style={{
        paddingTop: "80px",
        backgroundColor: "#E4F5EC",
        height: "100dvh"

      }}>

        <div className='d-flex justify-content-center mt-5'>
          {
            orders?.map((item) => (
              <div  className="containerdiv ">


                <div className="content">
                  <div className="header">
                    <div>
                      <h1>My Orders</h1>
                      {/* <p className="header-subtitle">View and edit all your pending, delivered, and returned orders here.</p> */}
                    </div>
                  </div>

                  <div className="order-item">
                    <div className="order-header">
                      <div className="order-number">Order Id: <span>{item.orderId}</span></div>
                      <div className="order-date">Order Placed: {item.placed_at}</div>
                      <button className="track-button">
                        <i className="track-icon">📦</i> TRACK ORDER
                      </button>
                    </div>

                    {
                      item.items?.map((product) => (


                        <div className="product-item ">
                          <div className="product-image">
                            <img src="" alt="product image" />
                          </div>
                          <div className="product-details">
                            <div className="product-title">{product.name}</div>
                            {/* <div className="product-designer">By: Milly Thomas</div> */}
                            <div className="product-meta">
                              <div>
                                <span className="product-size">Category:{product.category}</span>
                                <span className="product-qty">Qty:{product.quantity}</span>
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
                            <div className="delivery-date">24 December 2025</div>
                          </div>
                        </div>

                      ))
                    }


                    <div className="order-footer">
                      <button className="cancel-button">
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
          }

        </div>





      </div>


    </>

  )
}

export default OrderHistory