"use client"
import { usePathname } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'
import "./Navbar.css"
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import Link from 'next/link';
const Navbar = () => {
  const pathname = usePathname();
  const cartitems = useSelector((state) => state.CartItem.MyCart);
  const Cart_items_length = cartitems.length;
  const mobileNavLinks = [
    {
      link: "/home",
      icon: <IoMdHome />,
      text: "Home"
    },
    {
      link: "/categories",
      icon: <BiSolidCategory />,
      text: "Categories"
    },
    {
      link: "/mycart",
      icon: <IoIosCart />,
      text: "Cart"
    },
    {
      link: "/products",
      icon: <MdProductionQuantityLimits />,
      text: "Products"
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
      <div className='hidden md:block logo font-[Poppins] text-xl md:font-light xl:text-2xl 2xl:text-4xl w-full text-center md:w-[30%]'>
        <span className="text-[--text-color] ecologo">Eco</span>Glow <span className="text-[--text-color] orglogo">Org</span>anics
      </div>
      <div className='hidden navbar md:flex justify-center py-2'>
        <ul className='flex gap-3 2xl:gap-5 items-center justify-center'>
          {PCNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            const isCartItem = index === 2;
            return (
              <li key={index} id='psuedo_underline' className='list-none text-md relative'>
                <Link href={item.link} className={isActive ? "text-[#97EFE9] underline underline-offset-8" : ""}>
                  {item.text}
                </Link>
                {isCartItem && (
                  <span className='absolute top-[-5px] font-bold text-lime-300 right-[-15px] p-1 rounded-full text-sm '>{Cart_items_length}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='search_login flex  py-2 items-center gap-2 w-full justify-end  md:w-[30%] '>
        <div className="flex w-full justify-between md:justify-end">
          <span className='md:hidden'>Find a Product? <Link href="/products" className="text-red-500 mx-1">Search here</Link></span>
          <span className='hidden md:block md:pr-5'><Link href="/products" className="text-red-500 mx-1">Search here</Link></span>
          <Link href="/profile" className='text-2xl rigth-0'><FaRegUserCircle /></Link>
        </div>
        <div className="md:hidden z-[100] flex fixed left-0 bottom-0 w-full justify-around bg-[#2E0219] p-2">
          {mobileNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index} className='list-none text-2xl'>
                <Link href={item.link} className={`${isActive ? "text-[#97EFE9] " : ""} flex flex-col items-center`}>
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
