import React from 'react'
import Data from "./Products.json"
const page = () => {
  const Products = Data;

  const Filters = [
    {
      "filter": "Makeup"
    },
    {
      "filter": "Unstitched"
    }
  ]

  const Ptypes = [
    {
      "ilter": "Foundation"
    },
    {
      "ilter": "Concelers"
    }
  ]
  

  return (
    <div className='flex md:flex-row flex-col'>
      <div className='Filters border-red-600 w-full md:w-1/5 text-[--secondary-color]'>
        <div className='Listings'>
          {Filters.map((item, index) => {
            return (
                <>
                  <div key={index} className='font-bold md:flex-col md:p-2 flex justify-around'>
                    {item.filter}
                  </div>
                  <ul className='md:ml-8 ml-0'>
                    {Ptypes.map((it, index) => (
                      <li className='text-[--text-color] bg-[--secondary-color] px-2 py-1 hover:bg-[--navbar-color] hover:cursor-pointer transition-all duration-300 mt-2 md:w-full min-w-fit w-2/4 mx-auto' key={index}>{it.ilter}</li>
                    ))}
                  </ul>
                </>
            )
          })}
        </div>
      </div>
      <div className='Products w-full md:w-4/5 '>
      <div className="new-arrivals text-center mt-4 p-2 text-lg md:text-xl xl:text-2xl 2xl:text-4xl font-[Poppins] text-[--navbar-color]">All Products</div>
      <div className="cards md:flex-row flex flex-wrap items-center justify-around w-full gap-y-5">
        {Products.map((item) => {
          return (
            <div key={item.title} className='card w-[200px] md:w-[250px] flex flex-col bg-red-300 justify-between relative rounded-lg p-2 text-[--body-color]'>
              <div className="image relative py-2">
                <img className='w-[180px] hover:scale-110 transition-all md:w-[220px] m-1 mx-auto h-[200px] object-cover text-center rounded-md' src={item.image} alt="" />
              </div>
              <div className="item-desc flex justify-between flex-col pl-2">
                <div className='text-lg font-[Poppins]'>{item.title}</div>
                <div className='font-bold text-black' >{item.price}</div>
                <div className="flex justify-between "><button className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-800 ">Add item</button><button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button></div>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}

export default page
