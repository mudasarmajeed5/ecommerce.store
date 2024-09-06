'use client'
interface LayoutProps {
  children: React.ReactNode,
}
import { AdminNav } from "@/components/admin-nav"

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {

  return (<>
    <div className='flex h-screen'>
      <AdminNav />
      <main className="flex-1 overflow-y-auto text-black lg:ml-64">
        {children}
      </main>
    </div>
    <footer className='bg-red-950 py-2 text-white text-center'>mudassarmajeed5 || 2024 @All rights reserved</footer>
  </>
  )
}

export default AdminLayout