import React from 'react'
import { v4 } from 'uuid'
import Product1 from "./Images/CardImages/Product1.jpg"
import Product2 from "./Images/CardImages/Product2.jpg"
import Product3 from "./Images/CardImages/Product3.jpg"
const NewArrivals = () => {
    const CardsData = [
        {
            "title": "Lipstick | Lipbalm",
            "image": Product1.src,
            "price": "$10"
        },
        {
            "title": "Eyeshadow Palette",
            "image": Product2.src,
            "price": "$25"
        },
        {
            "title": "Whitening cream",
            "image": Product3.src,
            "price": "Rs.550"
        }
    ];

    return (
        <div>
            <div className="new-arrivals text-center mt-4 p-2 text-lg md:text-xl xl:text-2xl 2xl:text-4xl font-[Poppins] text-[--navbar-color]">Hot Deals</div>
            <div className="cards flex justify-around w-full">
                {CardsData.map((item) => {
                    let unique_id = v4();
                    return (
                        <div key={unique_id} className='card w-[250px] flex flex-col justify-between relative rounded-lg shadow-red-400 shadow-xl p-2 text-[--body-color]'>
                            <div className="image relative py-2">
                                <span className='absolute top-[5px] left-0 my-2 mx-1 px-2 rounded-lg text-white bg-red-800'>Sale</span>
                                <img className='w-full h-[200px] object-cover text-center rounded-md' src={item.image} alt="" />
                            </div>
                            <div className="item-desc flex justify-between flex-col pl-2">
                                <div className='text-lg font-mono'>{item.title}</div>
                                <div className='font-bold text-black' >{item.price}</div>
                                <button className="text-center hover:bg-black transition-all px-2 py-1 rounded-md text-white bg-gray-900">Add to Cart</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewArrivals
