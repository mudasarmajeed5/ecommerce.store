'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DollarSignIcon, PackageIcon, PlusCircleIcon, MenuIcon, BoxIcon, HomeIcon } from 'lucide-react'
export function AdminNav() {
  const [open, setOpen] = useState(false)
  const menuItems = [
    { name: 'Revenue', icon: <DollarSignIcon className="h-4 w-4 mr-2" />, href: '/admin/revenue' },
    { name: 'Orders', icon: <PackageIcon className="h-4 w-4 mr-2" />, href: '/admin/orders' },
    { name: 'Add Product', icon: <PlusCircleIcon className="h-4 w-4 mr-2" />, href: '/admin/products' },
    { name: 'Products', icon: <BoxIcon className="h-4 w-4 mr-2" />, href: '/admin' },
    { name: 'Homepage', icon: <HomeIcon className="h-4 w-4 mr-2" />, href: '/' },
  ]

  return (
    <nav>
      <div className="hidden bg-[--body-color] lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 ">
          <div className="flex bg-[--body-color] items-center h-16 flex-shrink-0 px-4">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="space-y-1 px-2 py-4 text-white">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className=" hover:text-primary hover:bg-muted group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="fixed top-1 left-0 z-40 bg-transparent">
              <MenuIcon className="h-8 w-8" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] bg-[--body-color] sm:w-[300px]">
            <nav className="flex flex-col bg-[--body-color] space-y-1 mt-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className=" hover:text-primary hover:bg-muted flex items-center px-2 py-2 text-base font-medium rounded-md"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}