"use client"
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { AddItem } from '../redux/Cart/CartItems';
import ProductCard from "./components/ProductCard";
const Products = () => {
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch();
  const [search, setsearch] = useState("");
  const [FilterSearch, setFilterSearch] = useState([]);
  const AddCurrentItem = (item, id) => {
    const newItem = { ...item, id: id };
    dispatch(AddItem(newItem));
  }
  useEffect(() => {
    const get_products = async () => {
      let response = await fetch('/api/products', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      let data_received = await response.json();
      let Products = data_received.foundData;
      setFilterSearch(Products); 
      setloading(false);
      
    }
    get_products();
  }, [])

  const filterSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = FilterSearch.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterSearch(filteredData);
  };

  if (loading) {
    return <div className='text-2xl w-full h-[40vh] flex justify-center items-center text-[--body-color] text-center animate-pulse text-bold mt-5'>Loading...</div>;
  }
  return (
    <>
      {FilterSearch.length < 1 && <div className='text-[30px] w-full h-[40vh] flex justify-center items-center text-[--body-color] text-center animate-pulse text-bold mt-5'>No Results found</div>}
      <div className="contman ml-[0%] xl:p-3 2xl:p-4  w-[20%] md:justify-end fixed top-0 left-0 md:right-20 z-[101] p-2 md:flex md:ml-[78%] justify-center items-center gap-3">
        <input onChange={(e) => { setsearch(e.target.value); filterSearch(e) }} value={search} className='rounded-2xl md:rounded-full text-white bg-[--body-color] mt-1 py-1 md:text-[16px] px-6 mr-6 md:px-2 md:py-1 w-[85vw] md:w-[20vw]' type="search" placeholder='Search for Something' />
      </div>

      <div className="hidden md:flex md:flex-row flex-col gap-5">
        <div className="w-1/5 bg-[--cart-theme]"></div>
        <div className="new-arrivals w-4/5 text-center mt-4 p-2 text-lg md:text-xl xl:text-2xl 2xl:text-4xl font-[Poppins] text-[--navbar-color]">Our Deals</div>
      </div>

      <div className='Products border-red-600 w-full flex md:flex-row flex-col gap-5'>
        <div className="md:w-1/5 bg-[--cart-theme] p-2 text-center">Filters and other Tags added here</div>
        <div className="cards md:flex-row flex flex-wrap items-center justify-around md:w-4/5">
          {FilterSearch.map((item, index) => {
            return (<ProductCard key={index} item={item} AddCurrentItem={AddCurrentItem} />)
          })}
        </div>
      </div>

    </>
  )
}

export default Products
