"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ToastContainer } from "react-toastify"
import CompactEditProductCard from "./compact-edit-product-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2Icon } from "lucide-react"

// Expanded mock data for products

export default function AdminDashboard() {
  const [SearchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any>([]);
  const get_products = async () => {
    let loader = document.getElementById("loader");
    loader?.classList.remove("hidden")
    let response = await fetch('/api/products', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    let data_received = await response.json();
    let Products = data_received.foundData;
    setProducts(Products)
    loader?.classList.add("hidden")
  }
  useEffect(() => {
    get_products();
  }, [])

  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const toggleProductStatus = async (id: string) => {
    const updatedProducts = (products.map((product: any) => {
      return product.id === id ? { ...product, isAvailable: !product.isAvailable } : product
    }));
    setProducts(updatedProducts);
    try {
      const updatedProduct = updatedProducts.find((product: any) => product.id === id);
      if (updatedProduct) {
        await fetch('/api/products', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: updatedProduct.id,
            isAvailable: updatedProduct.isAvailable
          }),
        });
      }

      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  // Search functionality
  const getFilteredProducts = () => {
    if (!SearchTerm) {
      return products;
    }
    return products.filter((product:any) =>
      product.title.toLowerCase().includes(SearchTerm.toLowerCase())
    );
  };
  const filteredProducts = getFilteredProducts();
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const handleSearch = (e:any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };
  const nextPage = () => {
    if (indexOfLastItem < products.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer theme="light" autoClose={500} />
      <div className="flex-1 overflow-auto">
        <header className="p-4 shadow-sm bg-[--body-color]">
          <div className="flex items-center justify-between md:justify-around">
            <h1 className="text-xl text-white font-semibold">Products</h1>
            <h1 className="text-md flex gap-2 text-white font-semibold">
              <label htmlFor="searchProduct">Search:</label>
              <input type="text" value={SearchTerm} onChange={handleSearch} className="text-black rounded-md bg-white/50" name="searchProduct" />
            </h1>
          </div>
        </header>
        <main className="p-6 text-black">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 justify-end"><Button onClick={()=>get_products()}>Refresh Changes</Button> <Loader2Icon id="loader" className="hidden animate-spin"></Loader2Icon></div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((product: any) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>Rs.{product.price}</TableCell>
                    <TableCell>{product.Stock}</TableCell>
                    <TableCell>{product.isAvailable ? "Active" : "InActive"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={product.isAvailable === true}
                        onCheckedChange={() => toggleProductStatus(product.id)}
                      />
                    </TableCell>
                    <TableCell><CompactEditProductCard data={product} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, products.length)} of {products.length} items
              </div>
              <div className="space-x-2">
                <Button onClick={prevPage} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button onClick={nextPage} disabled={indexOfLastItem >= products.length}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}