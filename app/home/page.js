import React from 'react'
import "./home.css"
const page = ({data}) => {
  return (
    <div className="hero text-black h-[70vh] flex items-center justify-center">
      {data.map((item, index) => {
        return(
          <>
            <img src='./Rectangle.png' height={"100%"} width={"100"} alt={item.alt} key={index} />
          </>
        )
      })}
      {/* Will add the picture moving functionality when multiple pictures are provided */}

    </div>
  )
}

export default page
