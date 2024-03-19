import { Ultra } from 'next/font/google'
import React from 'react'

const page = () => {
  const Products = [
    {
      "title": "Title 1",
      "image": "",
      "price": "Price 1"
    },
    {
      "title": "Title 2",
      "image": "",
      "price": "Price 2"
    },
    {
      "title": "Title 3",
      "image": "",
      "price": "Price 3"
    },
    {
      "title": "Title 3",
      "image": "",
      "price": "Price 3"
    },
    {
      "title": "Title 4",
      "image": "",
      "price": "Price 4"
    },
    {
      "title": "Title 5",
      "image": "",
      "price": "Price 5"
    },
    {
      "title": "Title 6",
      "image": "",
      "price": "Price 6"
    },
    {
      "title": "Title 7",
      "image": "",
      "price": "Price 7"
    },
    {
      "title": "Title 8",
      "image": "",
      "price": "Price 8"
    },
    {
      "title": "Title 9",
      "image": "",
      "price": "Price 9"
    },
    {
      "title": "Title 10",
      "image": "",
      "price": "Price 10"
    },
    {
      "title": "Title 11",
      "image": "",
      "price": "Price 11"
    },
    {
      "title": "Title 12",
      "image": "",
      "price": "Price 12"
    },
    {
      "title": "Title 13",
      "image": "",
      "price": "Price 13"
    },
    {
      "title": "Title 14",
      "image": "",
      "price": "Price 14"
    },
    {
      "title": "Title 15",
      "image": "",
      "price": "Price 15"
    },
    {
      "title": "Title 16",
      "image": "",
      "price": "Price 16"
    }
  ]

  const Filters = [
    {
      "filter": "Filter 1"
    },
    {
      "filter": "Filter 1"
    }
  ]

  const Ptypes = [
    {
      "ilter": "Filter 1"
    },
    {
      "ilter": "Filter 1"
    }
  ]


  return (
    <div className='grid grid-cols-2'>
      <div className='Filters'>
        <div className='Listings'>
          {Filters.map((item, index) => {
            return (
                <>
                  <div key={index}>
                    {item.filter}
                  </div>
                  <ul className=' ml-8 '>
                    {Ptypes.map((it, index) => (
                      <li key={index}>{it.ilter}</li>
                    ))}
                  </ul>
                </>
            )
          })}
        </div>
      </div>
      <div className='Products'>
      <div className="new-arrivals text-center mt-4 p-2 text-lg md:text-xl xl:text-2xl 2xl:text-4xl font-[Poppins] text-[--navbar-color]">Hot Deals</div>
      <div className="cards md:flex-row flex flex-wrap items-center justify-around w-full">
        {Products.map((item) => {
          return (
            <div key={item.title} className='card w-[200px] md:w-[250px] flex flex-col justify-between relative rounded-lg shadow-red-400 shadow-xl p-2 text-[--body-color]'>
              <div className="image relative py-2">
                <img className='w-[180px] m-1 mx-auto h-[200px] object-cover text-center rounded-md' src={item.image} alt="" />
              </div>
              <div className="item-desc flex justify-between flex-col pl-2">
                <div className='text-lg font-[Poppins]'>{item.title}</div>
                <div className='font-bold text-black' >{item.price}</div>
                <div className="flex justify-between "><button className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-900 ">Add item</button><button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button></div>
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
