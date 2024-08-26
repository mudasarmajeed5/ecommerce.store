'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
interface LayoutProps{
    children:React.ReactNode,
}

const AdminLayout:React.FC<LayoutProps> = ({children}) => {
  const path = usePathname();
  const isActive = (href:string)=>{
    return href===path;
  }  
  return (
    <div className='mx-auto relative min-h-screen'>
      <nav className='flex text-sm flex-wrap xl:text-md items-center gap-3 justify-around py-2'>
        <Link href={"/admin"}><span className="hover:cursor-pointer hover:underline underline-offset-4 text-xl"><span className="text-[--text-color] ecologo">Eco</span>Glow <span className="text-[--text-color] orglogo">Org</span>anics</span></Link>
        <Link href={"/admin/revenue"} className={`${isActive('/admin/revenue')? 'underline underline-offset-4':''} px-4 py-2`}>Revenue</Link>
        <Link href={"/admin/orders"} className={`${isActive('/admin/orders')? 'underline underline-offset-4':''} px-4 py-2`}>Orders</Link>
        <Link href={"/admin/products"} className={`${isActive('/admin/products')? 'underline underline-offset-4':''} px-4 py-2`}>Add Products</Link>
        <Link href={"/"}>Home</Link>
      </nav>
      <main className="text-black">{children}</main>
      <footer className='bg-red-950 py-2 text-white text-center'>mudassarmajeed5 || 2024 @All rights reserved</footer>
    </div>
  )
}

export default AdminLayout