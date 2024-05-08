"use client";
import React from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RemoveItem } from '../redux/Cart/CartItems';
import { toast } from 'react-toastify';
const Mycart = () => {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.CartItem.MyCart);
  const removeitem = (message) => {
    toast.success(`${message}`)
  };
  const handleRemoveItem = (item) => {
    dispatch(RemoveItem(item));
    removeitem(`${item.title} has been removed`);
  };
  return (<>

    {cartitems.length === 0 && (
      <div className='text-black min-h-screen flex flex-col items-center justify-center'>
        <div>
          Nothing in Cart, Explore
          <Link href={"/products"} className='hover:underline underline-offset-4 bg-[--navbar-color] text-white px-2 py-1 rounded-md mx-2'>Products</Link>
        </div>
      </div>
    )}
    <div className="flex justify-between md:flex-row flex-col">
      <div className="left-side-cart w-full">
        {cartitems.length > 0 && (
          <div className="flex text-black min-h-screen w-full flex-col p-2">
            <div className="text-center text-2xl font-bold my-5">Your items</div>
            {cartitems.map((item, index) => (
              <div key={index} className="w-full mx-auto md:w-4/5 mb-3 ">
                <div className="flex shadow-lg bg-[#d88984] rounded-lg overflow-hidden items-around relative">
                  <img src={item.image} alt={item.title} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover object-center" />
                  <div className="px-2 md:p-4">
                    <p className="text-md md:text-lg pt-1 font-semibold mb-2">{item.title}</p>
                    <p className="text-sm text-gray-900 my-2">Price: Rs.{item.price}</p>
                    <button className='hover:bg-black bg-gray-900 md:text-md text-sm absolute bottom-2 text-white px-2 py-1 ' onClick={() => handleRemoveItem(item)}>Remove Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='right-side-cart w-full my-5 text-black'>
        <div className="mb-3 mt-1 font-bold text-xl md:text-2xl text-center">Your Summary</div>
        <div className="total-summary p-4 overflow-auto text-lg font-bold w-4/6 h-[50vh] bg-[--cart-theme] mx-auto flex flex-col">
          <div className="total-items flex h-[40vh] gap-2 my-3">
            <span>Total Items: </span><span>{cartitems.length}</span></div>
          {cartitems.map((item, index) => (
            <div key={index} className="w-full flex gap-2 flex-col px-4 py-2 mb-2 rounded-sm shadow-lg">
              <p className="text-md md:text-lg flex w-full justify-between pt-1 font-semibold "><span>{item.title} </span> <span>Item Quantity x 1</span></p>
              <p className="text-sm text-gray-900 my-2">Price: Rs.{item.price}</p>
            </div>
          ))}
          {/* <div className="h">
            Hello
          </div> */}
        </div>
      </div>
    </div>

  </>
  );
};

export default Mycart;
