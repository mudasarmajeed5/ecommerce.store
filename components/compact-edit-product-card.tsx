"use client"
import { useState,useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ToastContainer, toast } from "react-toastify"
interface Product {
  id: string
  tag: string
  desc: string
  image: string
  title: string
  price: number
  Stock: number
  isAvailable: boolean
}
interface CompactEditProductCardProps {
  data: Product,
}
const CompactEditProductCard: React.FC<CompactEditProductCardProps> = ({ data }) => {
  const ProductData = data;
  const handleDelete = async (id: string) => {
    try {
      await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        })
      })
      toast.success('Product Deleted')
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  const handleUpdateItem = async (id: string, ChangedData: any) => {
    try {
      await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          Data: ChangedData
        }),
      });
      setIsOpen(!isOpen)
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
  const handleSubmit = (id: string, product: any) => {
    handleUpdateItem(id, product);

  }
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState({
    title: "",
    tag: "",
    price: 0,
    desc: "",
    image: "",
    Stock: 0,
  })
  useEffect(() => {
    setProduct(ProductData)
  }, [])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-1"><Button size='sm' onClick={() => setIsOpen(true)}>Edit</Button>
        <Button size='sm' variant="destructive" onClick={() => handleDelete(ProductData.id)}>Delete</Button></div>
      <ToastContainer theme="light" autoClose={1000} />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-auto py-4">
          <Card className="w-[400px] animate-in zoom-in duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Edit Product</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={product.title} onChange={handleChange} placeholder="Product title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag">Tag</Label>
                <select
                  name="tag"
                  onChange={(e: any) => handleChange(e)}
                  className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                  required
                  value={product.tag}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="blushes">Blushes</option>
                  <option value="eyeliners">Eyeliners</option>
                  <option value="creams">Creams</option>
                  <option value="concealers">Concealers</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Stock">Stock</Label>
                  <Input id="Stock" name="Stock" type="number" value={product.Stock} onChange={handleChange} placeholder="Stock" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" name="desc" value={product.desc} onChange={handleChange} placeholder="Product description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="destructive" onClick={() => setIsOpen(false)}>Discard</Button>
              <Button onClick={() => handleSubmit(ProductData.id, product)}>Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
export default CompactEditProductCard;