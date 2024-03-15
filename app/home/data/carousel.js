"use client"
import "./carousel.css"
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import React, { useState } from "react";
const Carousel = () => {
    const CarouselData = {
        "slides": [
            {
                "src": "https://picsum.photos/seed/img1/600/400",
                "alt": "Image 1 for carousel"
            },
            {
                "src": "https://picsum.photos/seed/img2/600/400",
                "alt": "Image 2 for carousel"
            },
            {
                "src": "https://picsum.photos/seed/img3/600/400",
                "alt": "Image 3 for carousel"
            }
        ]
    }
    let Imagedata = CarouselData.slides;
    const [slide, setslide] = useState(0);
    setInterval(() => {
        setslide(slide == Imagedata.length - 1 ? 0 : slide + 1);
    }, 4000);
    const nextSlide = () => {
        setslide(slide == Imagedata.length - 1 ? 0 : slide + 1);
    }
    const preSlide = () => {
        setslide(slide == 0 ? Imagedata.length - 1 : slide - 1);
    }

    return (
        <div className="carousel">
            <FaArrowCircleLeft className="arrow arrow-left" onClick={preSlide} />
            {Imagedata.map((image, index) => {
                return (
                    <img src={image.src} alt={image.alt} key={index} className={slide == index ? "slide" : "slide slide-hidden"} ></img>
                )
            })}
            <FaArrowCircleRight className="arrow arrow-right" onClick={nextSlide} />
            <span className="indicators">
                {Imagedata.map((_, index) => {
                    return <button className={slide == index ? "indicator" : "indicator indicator-inactive"} key={index} onClick={() => { setslide(index) }}></button>
                })}
            </span>
        </div>
    );
}

export default Carousel;
