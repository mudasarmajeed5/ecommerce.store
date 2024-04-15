"use client";
import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RemoveItem } from '../redux/Cart/CartItems';

const Mycart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.CartItem.MyCart);

  const handleRemoveItem = (item) => {
    dispatch(RemoveItem(item));
  };

  return (
    <div>
      {cartitems.length === 0 && (
        <div className='text-black h-[70vh] flex flex-col items-center justify-center'>
          <div>
            Nothing in Cart, Explore{' '}
            <Link href={"/products"} className='hover:underline underline-offset-4 bg-[--navbar-color] text-white px-2 py-1 rounded-md'>
              Products
            </Link>
          </div>
        </div>
      )}
      {cartitems.length > 0 && (
        <div className="flex text-black  w-full items-center flex-col overflow-y-scroll">
          {cartitems.map((item, index) => (
            <div key={index} className="w-full md:w-1/2 xl:w-1/2 p-4">
              <div className="flex shadow-lg bg-[#d88984] rounded-lg overflow-hidden items-around relative">
                <img src={item.image} alt={item.title} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover object-center" />
                <div className="px-2 md:p-4">
                  <p className="text-md md:text-lg font-semibold mb-2">{item.title}</p>
                  <p className="text-sm text-gray-900 my-2">{item.price}</p>
                <button className='bg-black md:text-md text-sm absolute bottom-2 text-white px-2 py-1 ' onClick={() => handleRemoveItem(item)}>Remove Item</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mycart;
