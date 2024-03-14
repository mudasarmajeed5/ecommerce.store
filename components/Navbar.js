"use client"
import React from 'react'
import { FaSearch,FaRegUserCircle,FaCartArrowDown } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import Link from 'next/link';
const Navbar = () => {

  return (
    <nav className='flex flex-col-reverse md:flex-row items-center bg-black p-2 xl:p-3 2xl:p-4 md:justify-between'>
      <div className='hidden md:block logo font-[Poppins] text-xl font-bold md:font-normal xl:text-2xl 2xl:text-4xl w-full text-center md:w-1/4'>
        CozyHome Accents
      </div>
      <div className='navbar w-full md:w-[70%] flex justify-center mt-2 py-2'>
          <ul className='flex gap-3 items-center justify-center'>
            <li className='hover:underline text-sm transition-all cursor-pointer underline-offset-2'>BirthDay Cards</li>
            <li className='hover:underline text-sm transition-all cursor-pointer underline-offset-2'>BlackFriday</li>
            <li className='hover:underline text-sm transition-all cursor-pointer underline-offset-2'>Candles</li>
            <li className='hover:underline text-sm transition-all cursor-pointer underline-offset-2'>Decoratives</li>
          </ul>
      </div>
      <div className='search_login pt-3 flex items-center gap-2 w-full md:justify-center md:w-1/4 '>
        <div className="search flex items-center gap-2">
          <input className='rounded-2xl md:rounded-full bg-gray-800 text-white text-lg py-1 md:text-[16px] px-3 md:px-2 md:py-0 w-[80vw] md:w-auto' type="search" placeholder='Search for Something' />
          <FaSearch/>
        </div>
        <div className="login text-2xl p-1 hover:cursor-pointer hover:text-teal-400">
          <FaRegUserCircle/>
        </div>
        <div className="md:hidden flex fixed left-0 bottom-0 w-full justify-around bg-black p-2">
          <li className='list-none text-2xl'><Link href="/" className='hover:text-blue-300'><IoMdHome/></Link></li>
          <li className='list-none text-2xl'><Link href="/categories" className='hover:text-blue-300'><BiSolidCategory/></Link></li>
          <li className='list-none text-2xl'><Link href="/mycart" className='hover:text-blue-300'><FaCartArrowDown/></Link></li>
          <li className='list-none text-2xl'><Link href="/profile" className='hover:text-blue-300'><FaRegUserCircle/></Link></li>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
