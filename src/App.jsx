
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Navi from './Components/Navi'
import Viewproduct from './Components/Viewproduct'
import Addproduct from './Components/Addproduct'
import Signup from './Components/Signup'
import Login from './Components/Login'
import AddtoCart from './Components/AddtoCart'


function App() {


  return (
    <>
    {/* <Navi/> */}
    <BrowserRouter>
    <Routes >
      <Route path='/' element={<Home/>}></Route>
      <Route path='/products' element={<Viewproduct/>}></Route>
      <Route path='/addproducts' element={<Addproduct/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/addtocart' element={<AddtoCart/>}></Route>
    
    </Routes>
    </BrowserRouter>
    

    
    
        
    </>
  )
}

export default App
