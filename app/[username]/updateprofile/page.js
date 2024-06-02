'use client'
import { useSession } from "next-auth/react"
import { useState } from "react";
const UpdateProfile = () => {
  const {data:session} = useSession();
  const user={address:"House No. ___ Street No.__, City __, State ______",phone:"0312-3456789"}
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  console.log(session);
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  if (!session) {
    return <div className="flex justify-center items-center min-h-[70vh]"> <span className="p-5 border-2 border-t-white border-black rounded-full animate-spin"></span></div>;
  }
  return (
    <div className="md:max-w-md bg-[--body-color] p-4 rounded-md shadow-xl w-4/5 mx-auto mt-2">
    <div className="flex justify-center items-center flex-col">
      <img src={session.user.image} alt="Profile" className="w-32 h-32 rounded-full" />
    </div>
    <div className="mb-1 mt-2">
      <label className="block text-[--text-color] font-mono text-sm font-bold mb-2">Name</label>
      <p>{session.user.name}</p>
    </div>
    <div className="mb-1">
      <label className="block text-[--text-color] font-mono text-sm font-bold mb-2">Username</label>
      <p>{session.user.email.split('@')[0]}</p>
    </div>
    
    <div className="mb-1">
      <label className="block text-[--text-color] font-mono text-sm font-bold mb-2">Email Address</label>
      <p>{session.user.email}</p>
    </div>
    <form>
      <div className="mb-1">
        <label className="block text-[--text-color] font-mono text-sm font-bold mb-2">Address</label>
        <textarea cols={10}
          type="text"
          placeholder={address}
          onChange={handleAddressChange}
          className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-1">
        <label className="block text-[--text-color] font-mono text-sm font-bold mb-2">Phone Number</label>
        <input
          type="text"
          placeholder={phone}
          onChange={handlePhoneChange}
          className="w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Profile
      </button>
    </form>
  </div>
  )
}

export default UpdateProfile