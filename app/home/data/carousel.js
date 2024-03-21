"use client"
import "./carousel.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import React, { useState, useEffect } from "react";
const Carousel = () => {
    const CarouselData = {
        "slides": [
            {
                "id" : "1",
                "src": "https://img.freepik.com/premium-photo/black-friday-sale-discounts-traditional-colors-black-red-yellow-banner-with-place-text_513327-124.jpg?w=1380",
                "alt": "LipGloss",
                "text": "Eid 2024"
            },
            {
                "id" : "2",
                "src": "https://img.freepik.com/premium-photo/women-s-fashion-store-shopping-center_1112-9608.jpg?w=1380",
                "alt": "Unstitched Cotton",
                "text": "Unstitched"
            },
            {
                "id" : "3",
                "src": "https://as1.ftcdn.net/v2/jpg/03/57/13/68/1000_F_357136873_cue75PAUGWqHLuiMdSDEtb4tbP5MbRU4.jpg",
                "alt": "Makeup",
                "text": "Makeup Kits"
            }
        ]
    }
    let Imagedata = CarouselData.slides;
    // Auto slideShow
    useEffect(() => {
        const intervalId = setInterval(() => {
            setslide(prevSlide => (prevSlide === Imagedata.length - 1 ? 0 : prevSlide + 1));
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);
    const [slide, setslide] = useState(0);
    const nextSlide = () => {
        setslide(slide == Imagedata.length - 1 ? 0 : slide + 1);
    }
    const preSlide = () => {
        setslide(slide == 0 ? Imagedata.length - 1 : slide - 1);
    }

    return (
        <div className="carousel w-full ">
            <MdArrowBackIos className="arrow arrow-left" onClick={preSlide} />
            {Imagedata.map((image, index) => {
                return (
                    <div key={index} className="Carousel-main">
                        <img src={image.src} draggable={false} alt={image.alt} key={image.id} className={`${slide == index ? "slide" : "slide slide-hidden"} object-cover md:w-[93vw] object-left h-[30vh] md:h-[45vh]`} ></img>
                        <div className={`${slide == index ? "slide Carouseltext" : "slide slide-hidden"} flex flex-col items-center`}>
                            <div className="text-blue-600">{image.text}</div>
                            <button className=" bg-blue-800 text-white text-sm px-2 py-1">Shop Now</button>
                        </div>
                    </div>
                )
            })}
            <MdArrowForwardIos className="arrow arrow-right" onClick={nextSlide} />
            <span className="indicators">
                {Imagedata.map((_, index) => {
                    return <button className={slide == index ? "indicator" : "indicator indicator-inactive"} key={index} onClick={() => { setslide(index) }}></button>
                })}
            </span>
        </div>
    );
}

export default Carousel;
