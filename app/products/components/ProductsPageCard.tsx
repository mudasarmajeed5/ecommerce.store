'use client'
import Link from "next/link"
interface ItemType {
    _id: string;
    image: string;
    tag: string;
    price:number;
    title:number;
}
  
type AddCurrentItemType = (item: ItemType) => void;
interface ProductCardProps {
    item: ItemType;
    AddCurrentItem: AddCurrentItemType;
  }
const Product_PageCard:React.FC<ProductCardProps> = ({item,AddCurrentItem}) => {
  return (
    <>
    <div className='card w-[170px] md:w-[220px] flex flex-col justify-between relative hover:shadow-red-700 hover:shadow-xl transition-all duration-300 p-1 text-[--body-color]'>

    <Link className="hover:cursor-pointer" href={`/products/${item._id}`}>
      <div className="image relative py-1">
        <img className='w-[160px] md:w-[200px] m-1 mx-auto duration-300 h-[160px] hover:scale-105 scale-100 transition-all object-cover text-center rounded-md' src={item.image} alt="" />
      </div>
    </Link>

      <div className="item-desc flex justify-between flex-col pl-2">
        <div className='text-sm md:text-md xl:text-lg font-[Poppins]'>{item.title}</div>
        <div className='hidden'>{item.tag}</div>
        <div className='font-semibold text-black text-sm'>Rs. {item.price}</div>
        <div className="flex justify-between">
          <button onClick={() => AddCurrentItem(item)} className="hover:bg-black mr-1 w-4/5 text-sm transition-all px-2 py-1 rounded-md text-white bg-gray-900">Add item</button>
          <Link href={`/products/${item._id}`}><button className='hover:bg-black transition-all px-2 py-1 rounded-md text-sm text-white bg-gray-900'>Details</button></Link>
        </div>
      </div>
    </div>
  </>
  )
}

export default Product_PageCard