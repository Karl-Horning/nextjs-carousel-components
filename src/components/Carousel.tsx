"use client";

import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

/**
 * Represents a slide with its URL.
 */
type Slide = {
    url: string;
    title?: string;
    caption?: string;
    link?: string;
};

/**
 * Props for the Carousel component.
 */
interface CarouselProps {
    slides: Slide[]; // Array of slides to display in the carousel
    slideDelay: number; // Delay between slides in seconds
}

/**
 * Carousel component.
 * @param {CarouselProps} slides - Array of slides to display.
 * @param {CarouselProps} slideDelay - Delay between slides in seconds.
 */
export default function Carousel({ slides, slideDelay }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    /**
     * Moves to the previous slide.
     */
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    /**
     * Moves to the next slide.
     */
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }, [slides.length]);

    /**
     * Navigates to the specified slide.
     * @param {number} slideIndex - Index of the slide to navigate to.
     */
    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    // Effect to handle automatic slide transition
    useEffect(() => {
        const slideInterval = setInterval(() => {
            nextSlide();
        }, 1000 * slideDelay);

        // Cleanup interval on component unmount
        return () => clearInterval(slideInterval);
    }, [nextSlide, slideDelay]);

    return (
        <div
            id="carousel-container"
            className="h-[600px] w-full m-auto relative group"
            role="region"
            aria-label="Image Carousel"
        >
            {slides.map((slide, slideIndex) => (
                <div
                    // Slide container
                    key={slide.url}
                    className={`relative w-full h-full bg-center bg-cover duration-500 ${
                        slideIndex === currentIndex ? "" : "hidden"
                    }`}
                    style={{ backgroundImage: `url(${slide.url})` }}
                    role="img"
                    aria-label={`Slide ${currentIndex + 1}`}
                >
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-outline-black">
                        <h2 className="text-4xl py-4 font-bold">
                            {slide.title}
                        </h2>
                        <p className="text-2xl">{slide.caption}</p>
                        <p className="py-4">
                            <a
                                href={slide.link}
                                className="text-cyan-600 hover:text-cyan-400"
                            >
                                Read More
                            </a>
                        </p>
                    </div>
                </div>
            ))}

            {/* Previous slide button */}
            <button
                id="previous-button"
                className="h-[100%] absolute left-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                onClick={prevSlide}
                aria-label="Previous Slide"
            >
                <BsChevronCompactLeft size={30} />
            </button>

            {/* Next slide button */}
            <button
                id="next-button"
                className="h-[100%] absolute right-0 top-1/2 p-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white hover:text-amber-500 cursor-pointer"
                onClick={nextSlide}
                aria-label="Previous Slide"
            >
                <BsChevronCompactRight size={30} />
            </button>

            {/* Slide navigation buttons */}
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
