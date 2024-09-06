'use client'
import { v4 } from "uuid"
import { useEffect, useState } from "react"
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
interface ItemType {
    _id: string,
    title: string,
    price: number,
    id: string,
    image: string,
    desc: string
}
const NewArrivals: React.FC = () => {
    const {data:session} = useSession();
    const [CartItems, setCartItems] = useState<any[]>(() => {
        const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cartitems') : null;
        return savedCart ? JSON.parse(savedCart) : [];
    })
    const [Products, setProducts] = useState<ItemType[]>([]);
    const [Loading, setLoading] = useState(true)
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
          const rolledBackCart = CartItems.filter(CartItem => CartItem.id !== item.id);
          setCartItems(rolledBackCart);
          localStorage.setItem('cartitems', JSON.stringify(rolledBackCart));
        }
    
    
      }
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let response = await fetch('/api/products', {
                    method: 'GET', headers:
                    {
                        'Content-Type': 'application/json',

                    }
                });
                let fetchedData = await response.json();
                const HotDeals = fetchedData.foundData;
                let Product_Array = []
                for (let i = 0; i <= 7; i++) {
                    let product_number = HotDeals[i];
                    Product_Array.push(product_number);
                }
                if (HotDeals.length > 0) setProducts(Product_Array)
                setLoading(false);
            } catch (error) {
                const err = error as Error;
                console.log('Error fetching Data', err)
            }
        }
        fetchProducts();


    }, [])
    if (Loading) {
        return <div className='text-2xl w-full h-[80vh] flex justify-center items-center text-[--body-color] text-bold mt-5'>
            <span className="p-4 border-2 border-t-black border-white animate-spin rounded-full"></span>
        </div>;
    }
    return (
        <div>
            {Products.length === 0 && <div className='text-[30px] w-full h-[40vh] flex justify-center items-center text-[--body-color] text-center animate-pulse text-bold mt-5'>No Results found</div>}
            <div className="text-center mt-10 mb-5 text-2xl text-black">Hot deals</div>
            <div className="md:w-4/5 mx-auto place-items-center border-black grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {Products.map((item: ItemType, index) => {
                    return (
                        <div key={index} className='card w-[170px] md:w-[220px] flex flex-col justify-between relative hover:shadow-red-700 hover:shadow-xl transition-all duration-300 p-1 text-[--body-color]'>
                            <div className="image relative py-2">
                                <Link href={`/products/${item._id}`}>
                                    <img className='w-[160px] md:w-[200px] m-1 mx-auto duration-300 h-[160px] hover:scale-100 scale-95 transition-transform object-cover text-center rounded-md' src={item.image} alt="" />
                                </Link>
                            </div>
                            <div className="item-desc flex justify-between flex-col pl-2">
                                <div className='text-sm xl:text-lg font-[Poppins]'>{item.title}</div>
                                <div className='font-bold text-black' >{item.price}</div>
                                <div className="flex justify-between ">

                                    <button onClick={() => AddCurrentItem(item)} className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-900 ">Add item</button> <Link href={`/products/${item._id}`}><button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NewArrivals