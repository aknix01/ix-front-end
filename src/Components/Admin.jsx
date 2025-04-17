import React from 'react'
import Navi from './Navi'

function Admin() {
  return (
    <>
    <Navi/>
    <div
    style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontSize:"40px",
         backgroundColor: "#E4F5EC",
         height:"100vh"
    }} >Management Page</div>
    </>
  )
}

export default Admin