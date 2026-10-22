import React from 'react'
import {Link} from "react-router-dom"
import {Home, ShoppingCart,} from 'lucide-react';
import {useCart} from '../context/CartContext';
import { useState } from 'react';
const Navbar = () => {

  const {cartCount} = useCart()

  const [user, setUser] = useState(() => {
     try{
       return JSON.parse(localStorage.getItem("demoUser")) || null;  
     }
     catch{
       return null;
     }
  });
  const firstLetter = user?.name?.trim()?.charAt(0)?.toUpperCase();

  return (
    <>
     <header className='sticky z-50 top-0 bg-gray-950/95 backdrop-blur-md text-white shadow-2xl shadow-gray-950/70 border-b border-orange-900'>
       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={'/'}>
         <div className="flex items-center space-x-3 cursor-pointer">
           <Home className='w-8 h-8 text-orange-400 drop-shadow-lg' />
           <h1 className='text-4xl font-extrabold uppercase tracking-widest'>RKD<span className='text-orange-400'>STORE</span></h1>
         </div>
        </Link>
        <nav className='flex space-x-6 items-center'>
          <Link to={'/cart'}
           className='relative p-3 bg-orange-500/10 rounded-xl hover:bg-orange-500/20 transition duration-200 border border-orange-400/50 shadow-lg cursor-pointer' >
           <ShoppingCart className='w-6 h-6 text-orange-400' />

           {cartCount>0 && (<span className='absolute top-0 right-0 inline-flex items-center px-2 justify-center py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-6 h-5'>
             {cartCount}
           </span>)}
          </Link>

          {user ? (
  <div className="flex items-center gap-3">
    <button
      type="button"
      title={user.name}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-md hover:bg-indigo-700"
    >
      {firstLetter}
    </button>

    <button
      onClick={() => {
        localStorage.removeItem("demoUser");
        setUser(null);
      }}
      className="text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    to="/login"
    className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
  >
    Login / Signup
  </Link>
)}


        </nav>
       </div>
     </header>
    </>
  )
}

export default Navbar
