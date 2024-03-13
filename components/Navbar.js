"use client"
import React from 'react'
import { FaSearch,FaRegUserCircle } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className='flex flex-col md:flex-row items-center bg-black p-2 xl:p-3 2xl:p-4 md:justify-between'>
      <div className='logo font-[Poppins] text-xl font-bold md:font-normal xl:text-2xl 2xl:text-4xl w-full text-center md:w-1/4'>
        CozyHome Accents
      </div>
      <div className='navbar w-full md:w-[70%] flex justify-center'>
          <ul className='flex gap-3 items-center justify-center'>
            <li className='hover:underline transition-all cursor-pointer underline-offset-2'>BirthDay Cards</li>
            <li className='hover:underline transition-all cursor-pointer underline-offset-2'>BlackFriday</li>
            <li className='hover:underline transition-all cursor-pointer underline-offset-2'>Candles</li>
            <li className='hover:underline transition-all cursor-pointer underline-offset-2'>Decoratives</li>
          </ul>
      </div>
      <div className='search_login flex items-center gap-2 w-full justify-center md:w-1/4'>
        <div className="search flex items-center gap-1">
          <input className='rounded-full bg-gray-800 text-white px-2' type="search" placeholder='Search for Something' />
          <FaSearch/>
        </div>
        <div className="login text-2xl p-1 hover:cursor-pointer hover:text-teal-400">
          <FaRegUserCircle/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
