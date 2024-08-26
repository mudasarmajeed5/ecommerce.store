'use client'
import { useState,useEffect } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useSelector,useDispatch } from "react-redux"
import { RemoveItem,SetCartItems } from "@/app/redux/Cart/CartItems"
import { toast } from "react-toastify"
const Mycart = () => {
  const {data:session} = useSession();
  const dispatch = useDispatch();
  const cartitems = useSelector((state:any)=>state.CartItem.MyCart)
  const [Loader, setLoader] = useState<boolean>(true)
  useEffect(() => {
    const fetchUserCart = async () => {
      if (!session) {
        console.log('Session not found')
        return;
      }
      try {
        if(session && session.user && session.user.email){
            const res = await fetch('/api/cartupdate', {
                method: 'GET',
                headers: {
                  'email': session.user.email
                }
              });
              const data = await res.json();
              const fetchedCart = data.found_user.cartitems;
              console.log(fetchedCart)
              dispatch(SetCartItems(fetchedCart));
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      }finally {
        setLoader(false);
      }
    }
    if (session) {
      fetchUserCart();
      setLoader(false);
    }

  }, [session, dispatch]);

  useEffect(() => {
    if (!session || cartitems.length === 0) {
      return;
    }
    const updateDatabase = async (email:string) => {
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
    if(session && session.user && session.user.email){
        updateDatabase(session.user.email)
    }

  }, [cartitems, session])
  const removeitem = (message:string) => {
    toast.success(`${message}`)
  };
  const handleRemoveItem = (item:any) => {
    const isLastItem = cartitems.length === 1;

    dispatch(RemoveItem(item));
    removeitem(`${item.title} has been removed`);

    if (isLastItem && session) {
      const updateDatabase = async (email:string) => {
        try {
          const response = await fetch('/api/cartupdate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'email': email,
            },
            body: JSON.stringify({ cartitems:[] }),
          });
          if (!response.ok) {
            console.log('Error:', response.statusText);
            return;
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      };
      if(session && session.user && session.user.email){
        updateDatabase(session.user.email)
    }
    }
  };
  let total_bill:number = 0;
  return (<>
    {Loader && <div className='flex justify-center items-center w-screen bg-[#F7B2AD] fixed top-0 left-0 z-[10] h-screen'><span className="p-4 rounded-full border-t-red-700 border-2 border-white animate-spin"></span></div>}
    {cartitems.length === 0 && (
      <div className='text-black min-h-screen flex flex-col items-center justify-center'>
        <div>
          Nothing in Cart, Explore
          <Link href={"/products"} className='hover:underline underline-offset-4 bg-[--navbar-color] text-white px-2 py-1 rounded-md mx-2'>Products</Link>
        </div>
      </div>
    )}
    <div className="flex justify-between md:flex-row flex-col min-h-screen">
      <div className="left-side-cart w-full">
        {cartitems.length > 0 && (<>
          <div className="text-left mx-auto md:w-4/5 text-black text-2xl font-bold my-5">Your items</div>
          <div className="flex text-black max-h-[70vh] mt-5 overflow-auto w-full flex-col p-2">
            {cartitems.map((item:any, index:number) => (
              <div key={index} className="w-full bg-white rounded-md mx-auto md:w-4/5 mb-3 ">
                <div className="flex rounded-lg overflow-hidden border items-around relative">
                  <img src={item.image} alt={item.title} className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] object-cover object-center" />
                  <div className="px-2 md:p-4">
                    <p className="text-md md:text-lg pt-1 font-semibold mb-2">{item.title}</p>
                    <p className="text-sm text-gray-900 my-2">Price: Rs.{item.price}</p>
                    <button className='hover:bg-[--text-color] bg-[--third-color] md:text-md text-sm absolute bottom-2 text-black rounded-full px-2 py-1 ' onClick={() => handleRemoveItem(item)}>Remove Item</button>
                  </div>
                </div>
              </div>
            ))}
          </div></>
        )}
      </div>
      {cartitems.length > 0 &&
        <div className='right-side-cart w-4/5 mx-auto my-5 text-black'>
          <div className="mb-3 mt-1 font-bold text-xl w-4/5 mx-auto md:text-2xl text-left">Your Summary</div>
          <div className="total-summary bg-white rounded-md p-4 overflow-hidden text-lg w-11/12 md:w-4/6 h-[65vh] mx-auto flex flex-col item-end">
            <div className="total-items underline underline-offset-4 font-bold h-fit flex gap-2 mt-3">
              <span>Total Items : {cartitems.length}</span>
            </div>
            <div className="h-3/4  overflow-auto py-2 px-1">{cartitems.map((item:any, index:number) => (
              <div key={index} className="w-full flex gap-1 flex-col px-2 py-2 mb-1 rounded-sm">
                <p className="text-sm md:text-md flex w-full justify-between pt-1 font-semibold "><span>{item.title} </span> <span>Item Quantity x 1</span></p>
                <p className="text-sm text-gray-900 my-2 border-transparent border border-b-black">Price: Rs.{item.price}</p>
              </div>
            ))}
            </div>
            <div className="h-fit flex flex-col gap-1 items-start mt-2">
              <div><span>Total bill:</span>
              <span className="total-bill font-normal">
                {cartitems.map((product:any) => {
                  total_bill += product.price
                })}{total_bill} Rupees/-
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