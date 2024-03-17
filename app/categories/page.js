import React from 'react'
import { v4 as uuidv4 } from 'uuid'
const Categories = () => {
    const CardsData = [
        {
            "title": "Foundation"
        },
        {
            "title": "Concealer"
        },
        {
            "title": "Powder"
        },
        {
            "title": "Primer"
        },
        {
            "title": "Blush"
        },
        {
            "title": "Bronzer"
        },
        {
            "title": "Highlighter"
        },
        {
            "title": "Eyeshadow"
        },
        {
            "title": "Eyeliner"
        },
        {
            "title": "Mascara"
        },
        {
            "title": "Lipstick"
        },
        {
            "title": "Lip gloss"
        },
        {
            "title": "Setting spray"
        },
        {
            "title": "Makeup remover"
        },
        {
            "title": "Setting powder"
        },
        {
            "title": "Setting spray"
        },
        {
            "title": "Makeup brushes/tools"
        },
        {
            "title": "Contour products"
        }
    ];

    return (
      <div className="w-full flex flex-wrap justify-center">
        {CardsData.map((item) => {
          let unique_id = uuidv4();
          return (
            <div key={item.unique_id} className='card w-[250px] flex flex-col justify-between relative rounded-lg shadow-red-400 shadow-xl p-2 text-[--body-color] mx-4 my-4'>
              <div className="image relative py-2">
                <img className='w-full h-[200px] object-cover text-center rounded-md' src={item.image} alt="" />
              </div>
              <div className="item-desc flex justify-between flex-col pl-2">
                <div className='text-lg font-mono'>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  

export default Categories
