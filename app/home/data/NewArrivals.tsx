'use client'
import { v4 } from "uuid"
import Product1 from "./Images/CardImages/Product1.jpg"
import Product2 from "./Images/CardImages/Product2.jpg"
import Product3 from "./Images/CardImages/Product3.jpg"
import { AddItem } from "@/app/redux/Cart/CartItems"
import { useDispatch } from "react-redux"
const NewArrivals: React.FC = () => {
    const dispatch = useDispatch();
    const AddCurrentItem = (item: any, id: string) => {
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
                    return (
                        <div key={index} className='card w-[170px] md:w-[220px] flex flex-col justify-between relative border border-white hover:shadow-red-700 hover:shadow-xl transition-all duration-300 p-1 text-[--body-color]'>
                            <div className="image relative py-2">

                                <img className='w-[160px] md:w-[200px] m-1 mx-auto duration-300 h-[160px] hover:scale-105 scale-100 transition-all object-cover text-center rounded-md' src={item.image} alt="" />
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