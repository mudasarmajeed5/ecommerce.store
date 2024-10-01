"use client"
import { useEffect, useState } from "react";
import Product_PageCard from "./components/ProductsPageCard";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { data: session } = useSession();
  const [loading, setloading] = useState(true)
  const [search, setsearch] = useState("");
  const [ProductsData, setProductsData] = useState([])
  const [CartItems, setCartItems] = useState<any[]>(() => {
    const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cartitems') : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [FilterSearch, setFilterSearch] = useState([]);
  const AddCurrentItem = async (item: any) => {
    try {
      const updatedCart = [...CartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem('cartitems', JSON.stringify(updatedCart))
      const response = await fetch('/api/cartupdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'email': session?.user?.email || ''
        },
        body: JSON.stringify({ cartitems: updatedCart }),
      });
      toast.success(`${item.title} has been Added`);
      if (!response.ok) {
        console.error('Failed to add item to the database:', response.statusText);
        const rolledBackCart = CartItems.filter(CartItem => CartItem.id !== item.id);
        setCartItems(rolledBackCart)
        localStorage.setItem('cartitems', JSON.stringify(rolledBackCart));
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      // Rollback UI change if the request fails
      const rolledBackCart = CartItems.filter(CartItem => CartItem.id !== item.id);
      setCartItems(rolledBackCart);
      localStorage.setItem('cartitems', JSON.stringify(rolledBackCart));
    }


  }
  useEffect(() => {
    const get_products = async () => {
      let response = await fetch('/api/products', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      let { foundData } = await response.json();
      let Products = foundData.filter((prod: any) => prod.isAvailable);
      setProductsData(Products)
      setFilterSearch(Products);
      setloading(false);
    }
    get_products();
  }, [])
  const filterSearch = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = ProductsData.filter((item: any) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilterSearch(filteredData);
  };
  if (loading) {
    return <div className='text-2xl w-full h-[80vh] flex justify-center items-center text-[--body-color] text-bold mt-5'>
      <span className="p-4 border-2 border-t-black border-white animate-spin rounded-full"></span>
    </div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = ProductsData.slice(indexOfFirstItem, indexOfLastItem)
  const nextPage = () => {
    if (indexOfLastItem < ProductsData.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  return (
    <>
      {FilterSearch.length < 1 && <div className='text-[30px] w-full h-[80vh] flex justify-center items-center text-[--body-color] text-center animate-pulse text-bold mt-5'>No Results found</div>}
      <div className="contman ml-[0%] xl:p-3 2xl:p-4  w-[21%] md:justify-end fixed top-0 left-0 md:right-20 z-[101] p-2 md:flex md:ml-[78%] justify-center items-center gap-3">
        <input onChange={(e) => { setsearch(e.target.value); filterSearch(e) }} value={search} className='rounded-2xl md:rounded-full text-white bg-[--body-color] mt-1 py-1 md:text-[16px] px-6 mr-6 md:px-2 md:py-1 w-[85vw] md:w-[20vw]' type="search" placeholder='Search for Something' />
      </div>
      <div className="min-h-[80vh]">
        <div className='Products w-full flex md:flex-row flex-col gap-5'>
          {FilterSearch.length !== 0 && <div className="md:w-1/5 p-2 text-center">Filters and other Tags added here</div>}
          <div className="md:w-4/5 mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {currentItems.map((item, index) => {
              return (<Product_PageCard key={index} item={item} AddCurrentItem={AddCurrentItem} />)
            })}
          </div>
        </div>
        <div className="space-x-2 flex justify-end p-5">
          <Button onClick={prevPage} disabled={currentPage === 1}>
            Prev. 
          </Button>
          <Button onClick={nextPage} disabled={indexOfLastItem >= ProductsData.length}>
            Next
          </Button>
        </div>
      </div>

    </>
  )
}

export default Products