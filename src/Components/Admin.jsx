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
        fontSize:"40px"
    }} >Management Page</div>
    </>
  )
}

export default Admin