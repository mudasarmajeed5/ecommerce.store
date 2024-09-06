'use client'
import { useState } from 'react'
import Layout from "../AdminLayout";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { AdminRoutes } from '@/app/component/AdminSession';
import { useSession } from 'next-auth/react';
type Form = {
  title: string,
  tag: string,
  price: string,
  image: string,
  desc: string,
}
const Products = () => {
  const { data :session } = useSession();
  const [Form, setForm] = useState<Form>({
    title: '',
    tag: '',
    price: '',
    image: '',
    desc: ''
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: name === 'price' ? Number(value) : value
    }));
  };
  const addProduct = async () => {
    if (session) {
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Form })
        })
        if (!response.ok) {
          console.log('Error:', response.statusText);
          return;
        }
      }
      catch (error) {
        console.log('Error while fetching data', error)
      }
    }
  }
  const handleSubmit = async () => {
    let loader = document.getElementById("loader");
    if (loader) {
      loader.classList.remove("hidden");
      loader.classList.add("flex");
    }
    if (!session) {
      return
    }
    if (loader) {
      await addProduct()
      toast.success('Product has been added to Database');
      setForm({
        title: '',
        tag: '',
        price: '',
        image: '',
        desc: ''
      })
      loader.classList.add("hidden");
      loader.classList.remove("flex");
    }

  }

  return (
    <>
      <AdminRoutes>
        <ToastContainer autoClose={1000} theme='dark' />
        <Layout>
          <div className="flex flex-wrap min-h-screen justify-center gap-2 items-center">
            <div className="flex justify-center items-center min-w-fit rounded-lg h-fit my-5 mx-auto">
              <div className="max-w-xl p-2 space-y-6">
                <div className="bg-card  dark:bg-card-foreground p-6 rounded-lg shadow-2xl shadow-white">
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
                        onChange={(e) => handleChange(e)}
                        type="text"
                        id="product-name"
                        name="title"
                        className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                        placeholder="Enter product name"
                        required
                        value={Form.title}
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
                        onChange={(e) => handleChange(e)}
                        id="product-image"
                        name="image"
                        className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                        placeholder="Enter image link"
                        required
                        value={Form.image}
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
                        onChange={(e: any) => handleChange(e)}
                        id="product-description"
                        name="desc"
                        rows={3}
                        className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                        placeholder="Enter product description"
                        required
                        value={Form.desc}
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
                          onChange={(e) => handleChange(e)}
                          name="price"
                          className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                          placeholder="Enter price"
                          required
                          value={Form.price}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="product-category"
                          className="block text-sm font-medium text-primary"
                        >
                          Category
                        </label>
                        <select
                          name="tag"
                          onChange={(e: any) => handleChange(e)}
                          className="w-full px-3 py-2 mt-1 border border-black rounded-md focus:outline-none focus:ring focus:ring-primary text-black bg-transparent"
                          required
                          value={Form.tag}
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

                    </div>
                    <div className='flex justify-start items-center gap-2'>

                      <div
                        onClick={handleSubmit}
                        className="bg-blue-800 inline-block hover:cursor-pointer text-white text-primary-foreground hover:bg-blue-800/90 px-2 py-1 rounded-md"
                      >
                        Upload Product
                      </div>
                      <div id="loader" className="hidden justify-center items-center"><span className="p-3 border-2 rounded-full border-t-black animate-spin"></span></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className='w-[350px] overflow-y-auto overflow-x-hidden flex flex-col flex-wrap gap-3 relative border border-black rounded-lg bg-white py-4 px-8 h-fit my-5 mx-auto'>
              <img
                src={Form.image ? Form.image : "/Add Product.png"}
                alt="Product Image"
                className="w-full h-[40vh] object-cover object-center mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 h-fit w-full break-words">{Form.title ? Form.title : "Your product title"}</h2>
              <div className="text-sm mb-4 h-auto w-full break-words">
                {Form.desc ? Form.desc : "Add your product's description"}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Rs.{Form.price ? Form.price : "_____ "} /- Only</span>
              </div>
            </div>
          </div>
        </Layout>
      </AdminRoutes>
    </>

  )
}

export default Products