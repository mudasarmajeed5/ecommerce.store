'use client'
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const UpdateProfile = () => {
  const { data: session, status } = useSession()
  const [form, setform] = useState({
    email: '',
    address: {
      house: '',
      street: '',
      city: '',
      state: '',
      phone: ''
    }
  });
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setform(prevform => ({
        ...prevform,
        email: session.user.email ?? ''
      }));
    }
  }, [status, session]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setform(prevForm => ({
      ...prevForm,
      address: {
        ...prevForm.address,
        [name]: value
      }
    }));
  };
  const handle_form_submit = async (event) => {
    let loader = document.getElementById('loader');
    loader.classList.remove('hidden');
    loader.classList.add('flex');
    event.preventDefault();
    const response = await fetch('/api/updateuser', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    })
    if (!response.ok) {
      console.error('Error:', response.statusText);
      return;
    }
    const data = await response.json();

    if (data.success) {
      loader.classList.add('hidden');
      loader.classList.remove('flex');
      console.log('User updated successfully:', data);
      toast.success('Profile updated')
    } else {
      console.log('User update failed:', data.error);
      toast.error('Try again later.')
    }
  };


  if (!session) {
    return <div className="flex justify-center items-center min-h-[70vh]"> <span className="p-5 border-2 border-t-white border-black rounded-full animate-spin"></span></div>;
  }
  return (
    <div className="md:max-w-lg bg-[--body-color] p-4 rounded-md shadow-xl w-11/12 mx-auto mt-2">
      <div className="flex justify-center items-center flex-col">
        <img src={session.user.image} alt="Profile" className="w-32 h-32 rounded-full border-2" />
      </div>
      <div className="mb-1">
        <label className="block text-[--text-color] text-md font-mono font-bold mb-2">Name</label>
        <p className="text-sm">{session.user.name}</p>
      </div>
      <div className="mb-1">
        <label className="block text-[--text-color] text-md font-mono font-bold mb-2">Username</label>
        <p className="text-sm">{session.user.email.split('@')[0]}</p>
      </div>

      <div className="mb-1">
        <label className="block text-[--text-color] text-md font-mono font-bold mb-2">Email Address</label>
        <p className="text-sm">{session.user.email}</p>
      </div>
      <form onSubmit={handle_form_submit}>
        <div className="mb-1">
          <label className="block text-[--text-color] text-md font-mono font-bold mb-2">Address</label>
          <div className="grid-cols-2 grid-rows-2">
            <input onChange={handleForm} name="house" className="bg-transparent focus:outline-none focus:border-blue-500 m-1 border text-sm px-2 rounded-sm py-1" value={form.address.house} placeholder={'House No.'} type="text" />
            <input onChange={handleForm} name="street" className="bg-transparent focus:outline-none focus:border-blue-500 m-1 border text-sm px-2 rounded-sm py-1" value={form.address.street} placeholder={'Street'} type="text" />
            <input onChange={handleForm} name="city" className="bg-transparent focus:outline-none focus:border-blue-500 m-1 border text-sm px-2 rounded-sm py-1" value={form.address.city} placeholder={'City'} type="text" />
            <input onChange={handleForm} name="state" className="bg-transparent focus:outline-none focus:border-blue-500 m-1 border text-sm px-2 rounded-sm py-1" value={form.address.state} placeholder={'State'} type="text" />
          </div>
        </div>
        <div className="mb-1">
          <label className="block text-[--text-color] text-sm font-mono font-bold mb-2">Phone Number</label>
          <input
            type="text"
            value={form.address.phone}
            onChange={handleForm}
            name="phone"
            className="w-full px-2 py-1 text-sm border bg-transparent border-gray-300 focus:outline-none focus:border-blue-500"/>
        </div>
        <div className="flex justify-start items-center gap-2">
          <button
            type="submit"
            className="bg-blue-500 transition-all hover:bg-blue-700 text-white mt-3 py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
          <div id="loader" className="hidden justify-center items-center"><span className="p-3 mt-3 border-2 rounded-full border-t-black animate-spin"></span></div>
        </div>

      </form>
    </div>
  )
}

export default UpdateProfile