
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Navi from './Components/Navi'
import Viewproduct from './Components/Viewproduct'
import Addproduct from './Components/Addproduct'
import Signup from './Components/Signup'
import Login from './Components/Login'
import AddtoCart from './Components/AddtoCart'
import ForgotPassword from './Components/ForgotPassword'
import Admin from './Components/Admin'
import RoleBasedRoutes from './services/RoleBasedroutes'
import Checkout from './Components/Checkout'

function App() {


  return (
    <>
    {/* <Navi/> */}
    <BrowserRouter>
    <Routes >
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Viewproduct/>}></Route>
      <Route path='/addproducts' element={<RoleBasedRoutes allowedRoles={["Admin","Seller"]} > <Addproduct/></RoleBasedRoutes>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/addtocart' element={<AddtoCart/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
      <Route path='/management' element={<RoleBasedRoutes allowedRoles={["Admin"]}><Admin/></RoleBasedRoutes> }></Route>
      <Route path="/checkout" element={<Checkout/>}></Route>
    </Routes>
    </BrowserRouter>
    
                                             
</>
  )
}
                                                                          
export default App
