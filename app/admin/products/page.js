'use client'
import React,{useState} from 'react'
import Layout from '../AdminLayout'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { AdminRoutes } from '@/app/component/AdminSession'
const Products = () => {
  const [form, setform] = useState({
    name:'',
    price:'',
    imageLink:'',
    category:'',
    desc:''
  })
  const handleSubmit = () => {
    console.log('true');
    toast.success('Product has been added')
  }
  
  const handleChange = ({ target: { name, value } }) => {
    setform({ ...form, [name]: value });
    console.log(form);
  };
  
  return (
    <>
      <AdminRoutes>
        <ToastContainer autoClose={1000} theme='dark'/>
        <Layout>
          <div className="flex flex-wrap">
            <div className="flex justify-center items-center">
              <div className="max-w-3xl w-full p-6 space-y-6">
                <div className="bg-card border border-black dark:bg-card-foreground p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold text-primary">
                    Upload Product Details
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="product-name"
                        className="block text-sm font-medium text-primary"
                      >
                        Product Name
                      </label>
                      <input
                        onChange={(e)=>handleChange(e)}
                        type="text"
                        id="product-name"
                        name="name"
                        className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                        placeholder="Enter product name"
                        required=""
                        value={form.name}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="product-image"
                        className="block text-sm font-medium text-primary"
                      >
                        Product Image Link
                      </label>
                      <input
                        onChange={(e)=>handleChange(e)}
                        id="product-image"
                        name="imageLink"
                        className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                        placeholder="Enter image link"
                        required=""
                        value={form.imageLink}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="product-description"
                        className="block text-sm font-medium text-primary"
                      >
                        Product Description
                      </label>
                      <textarea
                        onChange={(e)=>handleChange(e)}
                        id="product-description"
                        name="desc"
                        rows={3}
                        className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                        placeholder="Enter product description"
                        required=""
                        defaultValue={form.desc}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="product-price"
                          className="block text-sm font-medium text-primary"
                        >
                          Price
                        </label>
                        <input
                          type="number"
                          id="product-price"
                          onChange={(e)=>handleChange(e)}
                          name="price"
                          className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                          placeholder="Enter price"
                          required=""
                          value={form.price}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="product-quantity"
                          className="block text-sm font-medium text-primary"
                        >
                          Category
                        </label>
                        <input
                          name="category"
                          onChange={(e)=>handleChange(e)}
                          className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                          placeholder="Enter quantity"
                          required=""
                          value={form.category}
                        />
                      </div>
                    </div>
                    <div
                      onClick={handleSubmit}
                      className="bg-blue-800 inline-block hover:cursor-pointer my-4 text-white text-primary-foreground hover:bg-blue-800/90 px-2 py-1 mt-4 rounded-md"
                    >
                      Upload Product
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <ProductCard data={form} />
          </div>
        </Layout>
      </AdminRoutes>
    </>
  )
}
export const ProductCard = ({data}) => {
  
  return(
  <div className="w-1/3 border dark:text-card p-4 h-[80vh] my-5 mx-auto">
    <img
      src={data?.imageLink? data?.imageLink : "https://fossil.scene7.com/is/image/FossilPartners/FS5237_main?$sfcc_fos_large$"}
      alt="Product Image" 
      className="w-full h-[40vh] object-cover object-center mb-4"
    />
    <h2 className="text-lg font-semibold mb-2">{data?.name? data?.name : "your product title"}</h2>
    <p className="text-sm mb-4">
      {data?.desc? data?.desc : "Add your product's description"}
    </p>
    <div className="flex justify-between items-center">
      <span className="text-lg font-semibold">Rs.{data?.price? data?.price : "_____ "} /- Only</span>
    </div>  
  </div>)
}
export default Products