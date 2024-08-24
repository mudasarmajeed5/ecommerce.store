'use client'
import { v4 } from "uuid"
const ProductCard = ({item,AddCurrentItem}) => {
  return (

    <div className='card w-[200px] md:w-[250px] flex flex-col justify-between relative rounded-lg hover:shadow-red-700 shadow-2xl transition-all duration-300 p-2 text-[--body-color]'>
      <div className="image relative py-2">
        <img className='w-[180px] md:w-[220px] m-1 mx-auto duration-300 h-[200px] hover:scale-110 scale-95 transition-all object-cover text-center rounded-md' src={item.image} alt="" />
      </div>
      <div className="item-desc flex justify-between flex-col pl-2">
        <div className='text-lg font-[Poppins]'>{item.title}</div>
        <div className='hidden'>{item.tag}</div>
        <div className='font-semibold text-black'>Rs. {item.price}</div>
        <div className="flex justify-between">
          <button onClick={() => AddCurrentItem(item, v4())} className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-900">Add item</button>
          <button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard