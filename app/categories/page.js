import React from 'react'

const page = () => {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center text-white font-bold'>
      <h2>Categories Page</h2>
      <ul className='flex text-xl mx-auto justify-between gap-4 list-none'>
        <li>Games</li>
        <li>Family pack</li>
        <li>Kids Meal</li>
      </ul>
    </div>
  )
}

export default page
