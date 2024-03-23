"use client";

import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

type Slide = {
    url: string;
};

interface CarouselProps {
    slides: Slide[];
    slideDelay: number;
}

export default function Carousel({ slides, slideDelay }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }, [slides.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 1000 * slideDelay);

        return () => clearInterval(slideInterval);
    }, [nextSlide, slideDelay]);

    return (
        <div
            id="carousel-container"
            className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group"
            role="region"
            aria-label="Image Carousel"
        >
            <div
                id="slides"
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                role="img"
                aria-label={`Slide ${currentIndex + 1}`}
            ></div>

            <button
                id="left-arrow-button"
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] left-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                onClick={prevSlide}
                aria-label="Previous Slide"
            >
                <BsChevronCompactLeft size={30} />
            </button>

            <button
                id="right-arrow-button"
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[50%] right-10 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
                onClick={nextSlide}
                aria-label="Next Slide"
            >
                <BsChevronCompactRight size={30} />
            </button>

            <div
                id="carousel-navigation"
                className="flex top-4 justify-center py-2"
                role="tablist"
                aria-label="Slide Navigation"
            >
                {slides.map((slide, slideIndex) => (
                    <button
                        key={slide.url}
                        className={`text-4xl cursor-pointer ${
                            slideIndex === currentIndex
                                ? "text-blue-500"
                                : "text-gray-500"
                        }`}
                        onClick={() => goToSlide(slideIndex)}
                        role="tab"
                        aria-selected={
                            slideIndex === currentIndex ? "true" : "false"
                        }
                        aria-controls={`slide-${slideIndex}`}
                    >
                        <RxDotFilled />
                    </button>
                ))}
            </div>
        </div>
    );
}
