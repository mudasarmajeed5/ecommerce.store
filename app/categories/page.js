const Categories = () => {
    const CardsData = [
        {
            "title": "Foundations",
            "price":"Starts from $10",
            "imageurl":"https://media.istockphoto.com/id/1184976308/photo/makeup-artist-applies-skintone.jpg?s=612x612&w=0&k=20&c=HVO9a50LWspdcMvMHj1ohNPMX-AxO4cjO_GhQTUhIRk="
        },
        {
            "title": "Concealers",
            "price":"Starts from $20",
            "imageurl":"https://c8.alamy.com/comp/2BCAYCE/vector-foundation-concealer-serum-metallic-pearlised-pink-tube-in-pink-background-2BCAYCE.jpg"
        },
        {
            "title": "Powders",
            "price":"Starts from $50",
            "imageurl":"https://t4.ftcdn.net/jpg/05/02/19/23/360_F_502192302_wiB17xkWXddb8aqYUnwG3aKBgV16Odvv.jpg"
        },
        {
            "title": "Primers",
            "price":"Starts from $50",
            "imageurl":"https://m.media-amazon.com/images/I/41jGDPV3UnS.jpg"
        },
        {
            "title": "Blushes",
            "price":"Starts from $50",
            "imageurl":"https://as2.ftcdn.net/v2/jpg/02/86/94/11/1000_F_286941163_XRUUAi3GUSkAC7Qb5HeZ87S2fHLpGEad.jpg"
        },
        {
            "title": "Unstitched",
            "price":"Starts from $50",
            "imageurl":"https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
        },
        
    ];

    return (
      <div className="w-full md:w-[70%] mx-auto gap-2 grid grid-cols-2 md:grid-cols-3 place-items-center">
        {CardsData.map((item) => {
          return (
            <div key={item.title} className='card hover:cursor-pointer w-[170px] md:w-[230px] flex flex-col justify-between relative rounded-lg shadow-lg hover:shadow-2xl hover:shadow-red-500 p-1 text-[--body-color] my-4 transition-all duration-300'>
              <div className="image relative py-2">
                <img className='w-full scale-[95%] hover:scale-[100%] transition-all duration-300 h-[170px] md:h-[220px] object-cover text-center rounded-md' src={item.imageurl} alt={item.title} />
              </div>
              <div className="item-desc flex justify-between flex-col pl-2">
                <div className='text-lg font-semibold text-center'>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  

export default Categories
