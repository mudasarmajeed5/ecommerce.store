"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { RemoveItem,SetCartItems } from '@/app/redux/Cart/CartItems';
import { toast } from 'react-toastify';
const Mycart = () => {
  const {data:session} = useSession()
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.CartItem.MyCart);
  useEffect(() => {
    const fetchUserCart = async() => {
      if (!session){
        console.log('Session not found')
        return;
      }
      try {
        const res = await fetch('/api/cartupdate', {
          method:'GET',
          headers: {
            'email': session.user.email
          }
        });
        const data = await res.json();
        const fetchedCart = data.found_user.cartitems;
        dispatch(SetCartItems(fetchedCart));
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    if (session){
      fetchUserCart();
    }
    
  }, [session, dispatch])
  
  useEffect(() => {
    if (!session || cartitems.length === 0) {
      return;
    }
    const updateDatabase = async (email) => {
      try {
        const response = await fetch('/api/cartupdate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'email': email,
          },
          body: JSON.stringify({ cartitems }),
        });
        if (!response.ok) {
          console.log('Error:', response.statusText);
          return;
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
    updateDatabase(session.user.email)

  }, [cartitems,session])

  const removeitem = (message) => {
    toast.success(`${message}`)
  };
  const handleRemoveItem = (item) => {
    dispatch(RemoveItem(item));
    removeitem(`${item.title} has been removed`);
  };
  let total_bill = 0;
  return (<>
    {cartitems.length === 0 && (
      <div className='text-black min-h-screen flex flex-col items-center justify-center'>
        <div>
          Nothing in Cart, Explore
          <Link href={"/products"} className='hover:underline underline-offset-4 bg-[--navbar-color] text-white px-2 py-1 rounded-md mx-2'>Products</Link>
        </div>
      </div>
    )}
    <div className="flex justify-between md:flex-row flex-col">
      <div className="left-side-cart w-full">
        {cartitems.length > 0 && (<>
          <div className="text-center text-black text-2xl font-bold my-5">Your items</div>
          <div className="flex text-black max-h-[70vh] mt-5 overflow-auto w-full flex-col p-2">
            {cartitems.map((item, index) => (
              <div key={index} className="w-full mx-auto md:w-4/5 mb-3 ">
                <div className="flex shadow-lg bg-[#d88984] rounded-lg overflow-hidden items-around relative">
                  <img src={item.image} alt={item.title} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover object-center" />
                  <div className="px-2 md:p-4">
                    <p className="text-md md:text-lg pt-1 font-semibold mb-2">{item.title}</p>
                    <p className="text-sm text-gray-900 my-2">Price: Rs.{item.price}</p>
                    <button className='hover:bg-black bg-gray-900 md:text-md text-sm absolute bottom-2 text-white px-2 py-1 ' onClick={() => handleRemoveItem(item)}>Remove Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div></>
        )}
      </div>
      {cartitems.length > 0 &&
        <div className='right-side-cart w-full my-5 text-black'>
          <div className="mb-3 mt-1 font-bold text-xl md:text-2xl text-center">Your Summary</div>
          <div className="total-summary rounded-md p-4 overflow-hidden text-lg w-11/12 md:w-4/6 h-[50vh] bg-[--cart-theme] mx-auto flex flex-col item-end">
            <div className="total-items font-bold h-fit flex gap-2 mt-3">
              <span>Total Items: </span><span>{cartitems.length}</span>
            </div>
            <div className="h-3/4 overflow-auto shadow py-2 px-1">{cartitems.map((item, index) => (
              <div key={index} className="w-full flex gap-1 flex-col px-2 py-2 mb-1 rounded-sm shadow-lg">
                <p className="text-sm md:text-md flex w-full justify-between pt-1 font-semibold "><span>{item.title} </span> <span>Item Quantity x 1</span></p>
                <p className="text-sm text-gray-900 my-2">Price: Rs.{item.price}</p>
              </div>
            ))}
            </div>
            <div className="h-fit flex gap-2 items-center mt-2">
              <span>Total bill:</span>
              <span className="total-bill font-normal">
                {cartitems.map((product) => {
                  total_bill += product.price
                })}{total_bill} Rupees/-
              </span>
              <button className='px-2 py-1 text-sm rounded-sm hover:bg-blue-700 bg-blue-500 text-white transition-all'>Checkout</button>
            </div>
          </div>
        </div>}
    </div>

  </>
  );
};

export default Mycart;
