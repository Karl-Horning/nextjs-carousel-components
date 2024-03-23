"use client";

import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

export default function Carousel() {
    const slides = [
        { url: "https://picsum.photos/1400/780?random=1" },
        { url: "https://picsum.photos/1400/780?random=2" },
        { url: "https://picsum.photos/1400/780?random=3" },
        { url: "https://picsum.photos/1400/780?random=4" },
        { url: "https://picsum.photos/1400/780?random=5" },
    ];

    const slideDelay = 6;

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = useCallback(() => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 1000 * slideDelay);

        // Cleanup interval on component unmount
        return () => clearInterval(slideInterval);
        // Re-run effect when currentIndex changes
    }, [currentIndex, nextSlide]);

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

            <button
                id="left-arrow-button"
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                onClick={prevSlide}
            >
                <BsChevronCompactLeft size={30} />
            </button>

            <button
                id="right-arrow-button"
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                onClick={nextSlide}
            >
                <BsChevronCompactRight size={30} />
            </button>

            <div
                id="carousel-navigation"
                className="flex top-4 justify-center py-2"
            >
                {slides.map((slide, slideIndex) => (
                    <button
                        className={`text-4xl cursor-pointer ${
                            slideIndex === currentIndex
                                ? "text-blue-500"
                                : "text-gray-500"
                        }`}
                        key={slide.url}
                        onClick={() => goToSlide(slideIndex)}
                    >
                        <RxDotFilled />
                    </button>
                ))}
            </div>
        </div>
    );
}
