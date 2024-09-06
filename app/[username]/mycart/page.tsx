'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi"
const Mycart = () => {
  let totalPrice = 0;
  const { data: session } = useSession();
  const [CartItems, setCartItems] = useState<any[]>([]);
  useEffect(() => {
    const savedCart = localStorage.getItem('cartitems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [])
  CartItems.forEach(item => {
    totalPrice += item.price;
  });
  const updateDatabase = async (cartItems: any)=>{
    try {
      localStorage.setItem('cartitems', JSON.stringify(cartItems))
      const response = await fetch('/api/cartupdate', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
          email: session?.user?.email || '',
        },
        body: JSON.stringify({ cartitems: cartItems })
      });
      if (!response.ok) {
        console.error('Failed to remove item from the database:', response.statusText);
      }
    }
    catch (error) {
      const err = error as Error;
      console.error(err.message);
    }
  }
  let timer: NodeJS.Timeout | null = null;
  const updateCartInDatabase_Debounce= (cartItems:any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      updateDatabase(cartItems)
    }, 1000); 
  }
  
  const [Loader, setLoader] = useState<boolean>(true)
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!session) {
        console.log('Session not found')
        return;
      }
      try {
        if (session && session.user && session.user.email) {
          const res = await fetch('/api/cartupdate', {
            method: 'GET',
            headers: {
              'email': session.user.email
            }
          });
          const data = await res.json();
          let fetchedCart = data.found_user.cartitems;
          fetchedCart = fetchedCart.map((item: any) => ({
            ...item,
            quantity: item.quantity? item.quantity:1
          }));
          setCartItems(fetchedCart)
          localStorage.setItem('cartitems', JSON.stringify(fetchedCart))
          setLoader(false)
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoader(false);
      }
    }
    if (session) {
      fetchUserCart();
      setLoader(false);
    }

  }, [session]);
  const increaseQuantity = (index: number) => {
    let updatedCartItems = [...CartItems];
    updatedCartItems[index] = {
      ...updatedCartItems[index],
      quantity: Math.max(updatedCartItems[index].quantity + 1, 1)
    }
    setCartItems(updatedCartItems);
    localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
    updateCartInDatabase_Debounce(updatedCartItems);
  }
  const decreaseQuantity = (index: number) => {
    let updatedCartItems = [...CartItems]
    updatedCartItems[index] = {
      ...updatedCartItems[index],
      quantity: Math.max(updatedCartItems[index].quantity - 1, 1)
    }
    setCartItems(updatedCartItems);
    localStorage.setItem('cartitems', JSON.stringify(updatedCartItems));
    updateCartInDatabase_Debounce(updatedCartItems);
  }
  
  const handleRemoveItem = async (item: any) => {
    const updatedCart = CartItems.filter(CartItem => CartItem.id !== item.id);
    try {
      setCartItems(updatedCart);
      localStorage.setItem('cartitems', JSON.stringify(updatedCart))

      const response = await fetch('/api/cartupdate', {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
          email: session?.user?.email || '',
        },
        body: JSON.stringify({ cartitems: updatedCart })
      });
      if (!response.ok) {
        console.error('Failed to remove item from the database:', response.statusText);
        setCartItems(prevItems => [...prevItems, item]);
      }
      toast.success(`${item.title} has been removed`);
    } catch (error) {
      console.error('Error during fetch', error);
      setCartItems(prevItems => [...prevItems, item]);
      localStorage.setItem('cartitems', JSON.stringify([...CartItems, item]))
    }

  };
  return (<>
    {Loader && <div className='flex justify-center items-center w-screen bg-[#F7B2AD] fixed top-0 left-0 z-[10] h-screen'><span className="p-4 rounded-full border-t-red-700 border-2 border-white animate-spin"></span></div>}
    {CartItems.length === 0 && (
      <div className='text-black min-h-screen flex flex-col items-center justify-center'>
        <div>
          Nothing in Cart, Explore
          <Link href={"/products"} className='hover:underline underline-offset-4 bg-[--navbar-color] text-white px-2 py-1 rounded-md mx-2'>Products</Link>
        </div>
      </div>
    )}
    <div className="flex justify-between md:flex-row flex-col">
      <div className="left-side-cart mx-auto md:w-full w-11/12">
        {CartItems.length > 0 && (<>
          <div className="text-left mx-auto md:w-4/5 text-black text-2xl font-bold my-5">Your items</div>
          <div className="flex text-black max-h-[70vh] mt-5 overflow-auto w-full flex-col p-2">
            {CartItems.map((item: any, index: number) => (

              <div key={index} className="w-full flex px-2 items-center gap-2 bg-white rounded-md mx-auto md:w-4/5 mb-3 ">
                <div><input type="checkbox" /></div>
                <div className="flex overflow-hidden items-around relative">
                  <img src={item.image} alt={item.title} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover object-center" />
                  <div className="px-2 md:p-4">
                    <p className="text-md md:text-lg pt-1 font-semibold mb-2">{item.title}</p>
                    <p className="text-sm text-gray-900 my-2">Price: Rs.{item.price}</p>
                    <div className="flex justify-start items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-md">
                        <button onClick={() => decreaseQuantity(index)} className="text-xl"><FiMinus /></button>
                        <span className="text-sm">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(index)} className="text-xl"><FiPlus /></button>
                      </div>
                      <div>
                        <button className='bg-[--text-color] hover:bg-cyan-500 text-sm rounded-md text-black px-2 py-1 ' onClick={() => handleRemoveItem(item)}>Remove Item</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div></>
        )}
      </div>
      {CartItems.length > 0 &&
        <div className='right-side-cart mx-auto md:w-full w-11/12 my-5 text-black'>
          <div className="mb-3 mt-1 font-bold text-xl w-4/5 mx-auto md:text-2xl text-left">Your Summary</div>
          <div className="total-summary bg-white rounded-md p-4 overflow-hidden text-lg w-11/12 md:w-4/6 h-[65vh] mx-auto flex flex-col item-end">
            <div className="total-items underline underline-offset-4 font-bold h-fit flex gap-2 mt-3">
              <span>Total Items : {CartItems.length}</span>
            </div>
            <div className="h-3/4  overflow-auto py-2 px-1">{CartItems.map((item: any, index: number) => (
              <div key={index} className="w-full flex gap-1 flex-col px-2 py-2 mb-1 rounded-sm">
                <p className="text-sm md:text-md flex w-full justify-between pt-1 font-semibold "><span>{item.title} </span></p>
                <p className="text-sm text-gray-900 my-2 border-transparent border border-b-black">Price: Rs.{item.price}</p>
              </div>
            ))}
            </div>
            <div className="h-fit flex flex-col gap-1 items-start mt-2">
              <div><span>Total bill:</span>
                <span className="total-bill font-normal">
                  {totalPrice}
                </span></div>
              <div className="flex items-center gap-2 text-sm"><input className='border px-2 py-1 border-black' type="text" placeholder='Coupon code' /><button className='bg-blue-600 text-white px-2 py-1 hover:bg-blue-500 '>Add Coupon</button></div>
              <button className='px-2 py-1 text-sm rounded-sm hover:bg-blue-700 bg-blue-500 text-white transition-all'>Checkout</button>
            </div>
          </div>
        </div>}
    </div>

  </>
  )
}

export default Mycart