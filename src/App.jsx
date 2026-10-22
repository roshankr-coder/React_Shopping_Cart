import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './pages/ProductList'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
 import { ToastContainer, toast, Bounce } from 'react-toastify';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


const App = () => {
  return (
    <>
     <Router>
      <ToastContainer
position="top-right"
autoClose={1300}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
      <div className="min-h-screen bg-gray-950 font-sans">
        <Navbar />
       <Routes>
         <Route path='/login' element={<Login />} />
         <Route path='/' element={<ProductList />} />
         <Route path='/product/:id' element={<ProductDetails />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/checkout' element={<Checkout />} />
       </Routes>
       <Footer />
      </div>
     </Router>
    </>
  )
}

export default App
