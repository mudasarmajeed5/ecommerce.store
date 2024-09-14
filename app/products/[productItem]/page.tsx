'use client'
import { useState,useEffect } from 'react'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
export default function ProductDetails() {
  const [product, setProduct] = useState<any>(null);
  const [Loading, setLoading] = useState<boolean>(true);  // State for loading
  const path = usePathname();
  const _id = path.split("/")[2];
  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof _id === 'string') { 
        try {
          const response = await fetch('/api/getsingleproduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id:_id }),
          });

          const data = await response.json();
          if (data.status === 200) {
            setProduct(data.product);
          }
        } catch (error) {
          console.log('Failed to fetch product',error);
        }
        finally{
          setLoading(false)
        } 
      }
    };

    fetchProduct();
  }, []);
  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`)
  }
  if (Loading){
    return <div className="min-h-[80vh] flex justify-center gap-4 text-black items-center">Loading product details...  <span><Loader2Icon className='animate-spin'/></span></div>;
  }
  return (
    <div className="container mx-auto px-4 xl:my-10 py-8 text-black">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex justify-center items-center">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-[300px] xl:w-[400px] xl:h-[400px] h-[300px] object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex">
              Rating: 
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-black" />
              ))}
            </div>
            <span className="ml-2 text-sm text-black">(4.5 / 5)</span>
          </div>
          <p className="2xl:text-2xl text-xl font-semibold mb-4">Rs. {product?.price.toFixed(2)}</p>
          <p className="mb-6"><span className="font-bold">Description:</span> <br />{product?.desc}</p>
          <div className="mb-6">
            <Label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black">
              Quantity
            </Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-blue-300"
              >
                -
              </Button>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-20 mx-2 text-center border-blue-300"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product?.Stock,quantity + 1))}
                className="border-blue-300"
              >
                +
              </Button>
            </div>
          </div>
          <p className="mb-4 text-sm text-black"><span className="font-bold">{product?.Stock}</span> items in stock</p>
          <p className="mb-4 text-sm bg-white inline-block px-2 py-1 text-black">{product?.isAvailable? "Item is Available":"Item not Available"}</p>
          <div className="flex space-x-4">
            <Button disabled={!product?.isAvailable} onClick={handleAddToCart} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1 hover:text-white border-blue-300 hover:bg-pink-600">
              <Heart className="w-4 h-4 mr-2" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
