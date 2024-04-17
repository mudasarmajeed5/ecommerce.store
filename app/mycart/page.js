"use client";
import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import {RemoveItem} from '../redux/Cart/CartItems';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Mycart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.CartItem.MyCart);
  const removeitem=(message) => {
    toast.success(`${message}`)
  }
  
  const handleRemoveItem = (item) => {
    dispatch(RemoveItem(item));
    removeitem(`${item.title} has been removed`);
  };

  return (
    <div>
      {cartitems.length === 0 && (
        <div className='text-black h-[70vh] flex flex-col items-center justify-center'>
          <div>
            Nothing in Cart, Explore
            <Link href={"/products"} className='hover:underline underline-offset-4 bg-[--navbar-color] text-white px-2 py-1 rounded-md mx-2'>Products</Link>
          </div>
        </div>
      )}
      {cartitems.length > 0 && (
        <div className="flex text-black  w-full items-center flex-col">
          {cartitems.map((item, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/2 p-4">
              <div className="flex shadow-lg bg-[#d88984] rounded-lg overflow-hidden items-around relative">
                <img src={item.image} alt={item.title} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover object-center" />
                <div className="px-2 md:p-4">
                  <p className="text-md md:text-lg pt-1 font-semibold mb-2">{item.title}</p>
                  <p className="text-sm text-gray-900 my-2">{item.price}</p>
                <button className='hover:bg-black bg-gray-900 md:text-md text-sm absolute bottom-2 text-white px-2 py-1 ' onClick={() => handleRemoveItem(item)}>Remove Item</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer theme={"dark"} autoClose={2000}/>
    </div>
  );
};

export default Mycart;
