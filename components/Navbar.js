"use client"
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import NavbarDropDown from './NavbarDropDown';
import "./Navbar.css"
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
const Navbar = () => {
  const router = useRouter()
  const Jump_to_Home = () => {
    router.push('/home');
  }
  const {data:session} = useSession();
  let username;
  if (session){
    username = session.user.email.split('@')[0];
  }
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
      link: "/products",
      icon: <MdProductionQuantityLimits />,
      text: "Products"
    },
    {
      link: session ? `/${username}/mycart` : '/login',
      icon: <IoIosCart />,
      text: session? 'Cart':'Login',
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
      link: "/products",
      text: "Products",
    },
    {
      link: session ? `/${username}/mycart` : '/login',
      text: session? 'Cart':'Login',
    },
  ];
  return (
    <>
    <ToastContainer autoClose={1000} theme='dark' />
    <nav className='flex sticky w-full  top-0 z-[100] flex-col-reverse md:flex-row items-center p-2 xl:p-3 2xl:p-4 md:justify-between'>
      <div className='hidden md:block logo font-[Poppins] text-xl md:font-light xl:text-2xl 2xl:text-4xl w-full text-center md:w-[30%]'>
        <span onClick={Jump_to_Home} className="hover:cursor-pointer hover:underline underline-offset-4"><span className="text-[--text-color] ecologo">Eco</span>Glow <span className="text-[--text-color] orglogo">Org</span>anics</span>
      </div>
      <div className='hidden navbar md:flex justify-center py-2'>
        <ul className='flex gap-3 2xl:gap-5 items-center justify-center'>
          {PCNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            const isCartItem = index === 3;
            const isDisabled = isCartItem && pathname === `/${username}/mycart`;  
            return (
              <li key={index} className='list-none text-sm relative'>
                <Link 
              href={isDisabled ? "#" : item.link} 
              className={`${isActive ? "text-[#97EFE9] underline underline-offset-8" : ""} ${isDisabled ? "pointer-events-none opacity-80" : ""}`}
            >
              {item.text}
            </Link>
                {isCartItem && session && (
                  <span className='absolute top-[-5px] font-bold text-lime-300 xl:right-[-14px] 2xl:right-[-18px] p-1 rounded-full text-sm '>{Cart_items_length}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className='search_login flex items-center gap-2 w-full justify-end md:w-[30%] '>
        <div className="flex w-full justify-between items-center py-2 md:py-0 md:justify-end">
          <span className='md:hidden'>Find a Product? <Link href="/products" className="text-red-500 mx-1">Search here</Link></span>
          <span className='hidden md:block md:pr-5'><Link href="/products" className="text-red-500 mx-1">Search here</Link></span>
          <button className='text-2xl'>{session ? <NavbarDropDown/> :<Link href={'/login'}><FaRegUserCircle/></Link> }</button>
        </div>
        <div className="md:hidden z-[100] flex fixed left-0 bottom-0 w-full justify-around bg-[#2E0219] p-2">
          {mobileNavLinks.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            const isCartItem = index === 3;
            const isDisabled = isCartItem && pathname === `/${username}/mycart`;
            return (
              <li key={index} className='list-none text-2xl relative'>
                <Link href={isDisabled? "#":item.link} className={`${isActive ? "text-[#97EFE9] " : ""}${isDisabled? 'pointer-events-none opacity-70':''} flex flex-col items-center`}>
                  {item.icon} 
                  <span className="text-sm">{item.text}</span>
                </Link>
                {isCartItem && (
                  <span className='absolute top-[-5px] font-bold text-lime-300 right-[-18px] p-1 rounded-full text-sm '>{Cart_items_length}</span>
                )}
              </li>
            );
          })}
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
