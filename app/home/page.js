import React from 'react'
import Carousel from './data/carousel'
import NewArrivals from './data/NewArrivals'
const page = () => {

  return (
    <div className='w-screen'>
      <Carousel />
      <NewArrivals/>
    </div>
  )
}

export default page
