import React from 'react'
import Navi from './Navi'

function Checkout() {
  return (
  <>
  <Navi/>
  <h2 style={{
    textDecoration:"underline"
  }} className='text-center my-5'>Payment</h2>

<div className='d-flex justify-content-center align-items-center my-5 '>   <button className='btn btn-success my-5'> PAY </button>
</div>  
  
  </>
  )
}

export default Checkout