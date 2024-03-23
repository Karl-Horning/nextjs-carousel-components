"use client";

import { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function Carousel() {
    const slides = [
        { url: "https://picsum.photos/1400/780?random=1" },
        { url: "https://picsum.photos/1400/780?random=2" },
        { url: "https://picsum.photos/1400/780?random=3" },
        { url: "https://picsum.photos/1400/780?random=4" },
        { url: "https://picsum.photos/1400/780?random=5" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div
            id="carousel-container"
            className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group"
        >
            <div
                id="slides"
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            ></div>
            <div
                id="left-arrow-container"
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            >
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div
                id="right-arrow-container"
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
            >
                <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
        </div>
    );
}
