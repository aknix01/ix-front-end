import React from 'react'
import Navi from './Navi'
import Footer from './Footer'

function OrderPlaced() {
    return (
        <> 
        <Navi />
        <div 
        style={{
            backgroundColor: "#E4F5EC",
            height: "100vh"
        }}>
        
            OrderPlaced
        </div> 
        <Footer />
        </>
    )
}

export default OrderPlaced