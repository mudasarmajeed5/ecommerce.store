"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import "./Navbar.css"
import { FaSearch, FaRegUserCircle, FaCartArrowDown } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import Link from 'next/link';
const Navbar = () => {
  const pathname = usePathname();
  const mobileNavLinks = [
    {
      link: "/home",
      icon: <IoMdHome />,
    },
    {
      link: "/categories",
      icon: <BiSolidCategory />,
    },
    {
      link: "/mycart",
      icon: <FaCartArrowDown />,
    },
    {
      link: "/profile",
      icon: <FaRegUserCircle />,
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
      link: "/profile",
      text: "Profile",
    },
  ];

  return (
    <nav className='flex flex-col-reverse md:flex-row items-center bg-black p-2 xl:p-3 2xl:p-4 md:justify-between'>
      <div className='hidden md:block logo font-[Poppins] text-xl font-bold md:font-normal xl:text-2xl 2xl:text-4xl w-full text-center md:w-1/4'>
        CozyHome Accents
      </div>
      <div className='hidden navbar w-full md:w-[70%] md:flex justify-center py-2'>
        <ul className='flex gap-3 items-center justify-center'>
          {PCNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index} id='psuedo_underline' className='list-none text-md'>
                <Link href={item.link} className={isActive?"text-teal-500":""}>
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='search_login py-2 flex items-center gap-2 w-full md:justify-center md:w-1/4 '>
        <div className="search flex items-center gap-2">
          <input className='rounded-2xl md:rounded-full bg-gray-800 text-white text-lg py-1 md:text-[16px] px-3 md:px-2 md:py-0 w-[80vw] md:w-auto' type="search" placeholder='Search for Something' />
          <FaSearch />
        </div>
        <div className="login text-2xl p-1 hover:cursor-pointer hover:text-teal-400">
          <FaRegUserCircle />
        </div>
        <div className="md:hidden flex fixed left-0 bottom-0 w-full justify-around bg-black p-2">
          {mobileNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index} className='list-none text-2xl'>
                <Link href={item.link} className={isActive?"text-teal-500":""}>
                  {item.icon}
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
