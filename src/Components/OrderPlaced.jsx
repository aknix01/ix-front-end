import React from 'react'
import Navi from './Navi'
import Footer from './Footer'

function OrderPlaced() {
    return (
        <>
            <Navi />
            <div
                style={{
                    paddingTop: "80px",
                    backgroundColor: "#E4F5EC",
                    height: "100dvh"
                }}>

                <div className='d-flex justify-content-center'>Order Placed</div>
            </div>
            <Footer />
        </>
    )
}

export default OrderPlaced