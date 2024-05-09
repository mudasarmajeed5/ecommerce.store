"use client"
import React from 'react'
import { v4 } from 'uuid'
import Product1 from "./Images/CardImages/Product1.jpg"
import Product2 from "./Images/CardImages/Product2.jpg"
import Product3 from "./Images/CardImages/Product3.jpg"
import { AddItem } from '@/app/redux/Cart/CartItems';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
const NewArrivals = () => {
    const dispatch = useDispatch();
    const AddCurrentItem = (item, id) => {
        const newItem = { ...item, id: id };
        dispatch(AddItem(newItem));
    }
    const CardsData = [
        {
            "title": "Lipstick | Lipbalm",
            "image": Product1.src,
            "price": 5000
        },
        {
            "title": "Eyeshadow Palette",
            "image": Product2.src,
            "price": 250
        },
        {
            "title": "Whitening cream",
            "image": Product3.src,
            "price": 550
        },
        {
            "title": "Whitening cream",
            "image": Product3.src,
            "price": 550
        }
    ];

    return (
        <div>
            <div className="new-arrivals text-center mt-4 p-2 text-lg md:text-xl xl:text-2xl 2xl:text-4xl font-[Poppins] text-[--navbar-color]">Hot Deals</div>
            <div className="cards md:flex-row flex flex-wrap items-center justify-around w-full">
                {CardsData.map((item, index) => {
                    let unique_id = v4();
                    return (
                        <div key={unique_id} className='card w-[200px] shadow hover:shadow-2xl hover:shadow-red-800 duration-300 transition-all md:w-[250px] flex flex-col justify-between relative rounded-lg px-2 pb-2 text-[--body-color]'>
                            <div className="image relative py-2">
                             
                                <img className='w-[220px] hover:scale-110 transition-all duration-300 m-1 mx-auto h-[200px] object-cover text-center rounded-md' src={item.image} alt="" />
                            </div>
                            <div className="item-desc flex justify-between flex-col pl-2">
                                <div className='text-lg font-[Poppins]'>{item.title}</div>
                                <div className='font-bold text-black' >{item.price}</div>
                                <div className="flex justify-between "><button onClick={() => AddCurrentItem(item, v4())} className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-900 ">Add item</button><button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewArrivals
