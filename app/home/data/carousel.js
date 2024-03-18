"use client"
import "./carousel.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import FirstImage from "./Images/FirstImage.png"
import SecondImage from "./Images/SecondImage.png"
import ThirdImage from "./Images/ThirdImage.png"
import React, { useState, useEffect } from "react";
const Carousel = () => {
    const CarouselData = {
        "slides": [
            {
                "id" : "1",
                "src": FirstImage.src,
                "alt": "Image 1 for carousel",
                "text": "nigga got killed"
            },
            {
                "id" : "2",
                "src": SecondImage.src,
                "alt": "Image 2 for carousel ",
                "text": " Image 2 for"
            },
            {
                "id" : "3",
                "src": ThirdImage.src,
                "alt": "Image 3 for carousel",
                "text": "Image 3 for"
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
                        <img src={image.src} draggable={false} alt={image.alt} key={image.id} className={`${slide == index ? "slide" : "slide slide-hidden"} object-cover md:w-[93vw] object-center h-[45vh] md:h-[45vh]`} ></img>
                        <div className={`${slide == index ? "slide Carouseltext" : "slide slide-hidden"}`}>
                            {image.text}
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
