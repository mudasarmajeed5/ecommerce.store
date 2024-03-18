"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import "./Navbar.css"
import { FaSearch, FaRegUserCircle} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import Link from 'next/link';
const Navbar = () => {
  const pathname = usePathname();
  const mobileNavLinks = [
    {
      link: "/home",
      icon: <IoMdHome />,
      text:"Home"
    },
    {
      link: "/categories",
      icon: <BiSolidCategory />,
      text:"Categories"
    },
    {
      link: "/mycart",
      icon: <IoIosCart />,
      text:"Cart"
    },
    {
      link: "/products",
      icon: <MdProductionQuantityLimits />,
      text:"Products"
    },
  ];
  const PCNavLinks = [
    {
      link: "/home",
      text: "Home",
    },
    {
      link: "/categories",
      text: "Categories",
    },
    {
      link: "/mycart",
      text: "My Cart",
    },
    {
      link: "/products",
      text: "Products",
    },
  ];

  return (
    <nav className='flex sticky w-full  top-0 z-[100] flex-col-reverse md:flex-row items-center p-2 xl:p-3 2xl:p-4 md:justify-between'>
      <div className='hidden md:block logo font-[Poppins] text-xl font-bold md:font-normal xl:text-2xl 2xl:text-4xl w-full text-center md:w-[30%]'>
      EcoGlow Organics
      </div>
      <div className='hidden navbar md:flex justify-center py-2'>
        <ul className='flex gap-3 2xl:gap-5 items-center justify-center'>
          {PCNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index} id='psuedo_underline' className='list-none text-md'>
                <Link href={item.link} className={isActive?"text-[#97EFE9]":""}>
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='search_login py-2 flex items-center gap-2 md:justify-center md:w-[30%] '>
        <div className="search flex items-center gap-2">
          <input className='rounded-2xl md:rounded-full bg-[#4A001F] text-white text-lg py-1 md:text-[16px] px-3 md:px-2 md:py-0 w-[80vw] md:w-auto' type="search" placeholder='Search for Something' />
          <FaSearch />
          <Link href="/profile" className='text-2xl'><FaRegUserCircle /></Link>
        </div>
        <div className="md:hidden z-[100] flex fixed left-0 bottom-0 w-full justify-around bg-[#2E0219] p-2">
          {mobileNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index} className='list-none text-2xl'>
                <Link href={item.link} className={`${isActive?"text-[#97EFE9]":""} flex flex-col items-center`}>
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    </nav>
    
  )
}

export default Navbar
