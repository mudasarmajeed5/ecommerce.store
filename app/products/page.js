"use client"
import React, { useState } from 'react';
import Data from "./Products.json";
import {v4} from 'uuid';
import { useDispatch } from 'react-redux';
import { AddItem } from '../redux/Cart/CartItems';
const Products = () => {
  
  const dispatch = useDispatch();
  const [search, setsearch] = useState("");
  const [FilterSearch, setFilterSearch] = useState(Data);
  const AddCurrentItem = (item,id) => {
    const newItem = { ...item, id: id }; 
    dispatch(AddItem(newItem));
  }

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
      "ilter": "Concelers",
    }
  ]

  const filterSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = Data.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterSearch(filteredData);
  };

  const filtering = (fiter) => {
    const filTerm = fiter.toLowerCase();
    const filData = Data.filter((item) => {
      return item.tag.toLowerCase().includes(filTerm.toLowerCase());
    });
    setFilterSearch(filData);
  };

  return (
    <>
      
      <div className="contman ml-[0%] xl:p-3 2xl:p-4  w-[20%] md:justify-end fixed top-0 left-0 md:right-20 z-[101] p-2 md:flex md:ml-[78%] justify-center items-center gap-3">
        <input onChange={(e) => { setsearch(e.target.value); filterSearch(e) }} value={search} className='rounded-2xl md:rounded-full text-white bg-[--body-color] mt-1 py-1 md:text-[16px] px-6 mr-6 md:px-2 md:py-1 w-[85vw] md:w-[20vw]' type="search" placeholder='Search for Something' />
      </div>

      <div className='flex md:flex-row flex-col'>
        <div className='Filters border-red-600 w-full md:w-1/5 text-[--secondary-color]'>
          <div key={v4()} className='Listings md:block flex justify-around'>
            {Filters.map((filterItem, filterIndex) => {
              return (
                <div key={filterIndex}>
                  <div className='md:flex-col md:p-2 text-2xl font-semibold italic underline flex justify-around'>
                    {filterItem.filter}
                  </div>
                  <ul className='md:ml-8 ml-0'>
                    {Ptypes.map((ptypeItem) => (
                      <li key={v4()} onClick={() => { filtering(ptypeItem.ilter) }} className='text-[--text-color] bg-[--secondary-color] px-2 py-1 hover:bg-[--navbar-color] hover:cursor-pointer transition-all duration-300 mt-2'>{ptypeItem.ilter}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>


        <div className='Products border-red-600 w-full md:w-4/5 '>
          <div className="new-arrivals text-center mt-4 p-2 text-lg md:text-xl xl:text-2xl 2xl:text-4xl font-[Poppins] text-[--navbar-color]">Our Deals</div>
          {
            FilterSearch.length < 1 && <div className='text-[30px] w-full h-[40vh] flex justify-center items-center text-[--body-color] text-center animate-pulse text-bold mt-5'>No Results found</div>
          }
          <div className="cards md:flex-row flex flex-wrap items-center justify-around w-full">
            {FilterSearch.map((item) => {
              return (
                <div key={item.title} className='card w-[200px] md:w-[250px] flex flex-col justify-between relative rounded-lg hover:shadow-red-700 shadow-2xl transition-all duration-300 p-2 text-[--body-color]'>
                  <div className="image relative py-2">
                    <img className='w-[180px] md:w-[220px] m-1 mx-auto duration-300 h-[200px] hover:scale-110 scale-95 transition-all object-cover text-center rounded-md' src={item.image} alt="" />
                  </div>
                  <div className="item-desc flex justify-between flex-col pl-2">
                    <div className='text-lg font-[Poppins]'>{item.title}</div>
                    <div className=' hidden' >{item.tag}</div>
                    <div className='font-bold text-black' >{item.price}</div>
                    <div className="flex justify-between "><button onClick={() => AddCurrentItem(item,v4())} className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-900 ">Add item</button><button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
