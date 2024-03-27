"use client";

import { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

/**
 * Represents a slide with its URL.
 */
type Slide = {
    url: string;
    caption?: string;
};

/**
 * Props for the Photo Carousel component.
 */
interface PhotoCarouselProps {
    slides: Slide[]; // Array of slides to display in the carousel
    slideDelay: number; // Delay between slides in seconds
}

/**
 * PhotoCarousel component.
 * @param {PhotoCarouselProps} slides - Array of slides to display.
 * @param {PhotoCarouselProps} slideDelay - Delay between slides in seconds.
 */
export default function PhotoCarousel({
    slides,
    slideDelay,
}: PhotoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    /**
     * Moves to the previous slide.
     */
    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    }, [slides.length]);

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

    // Effect to handle left and right arrows being used for slide transition
    useEffect(() => {
        /**
         * Event handler function to handle keyboard key press.
         * Calls `prevSlide` function on left arrow key press and `nextSlide` function on right arrow key press.
         * @param {KeyboardEvent} event - The keyboard event.
         */
        const handleKeyPress = (event: KeyboardEvent) => {
            // Use the 'key' property to check which key is pressed
            if (event.key === "ArrowLeft") {
                prevSlide();
            } else if (event.key === "ArrowRight") {
                nextSlide();
            }
        };

        // Add event listener for keydown event
        document.addEventListener("keydown", handleKeyPress);

        // Cleanup: remove event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [prevSlide, nextSlide]);

    // Variable to store the starting X coordinate of the touch
    let touchStartX = 0;

    /**
     * Event handler function for touch start event.
     * Records the starting X coordinate of the touch.
     * @param {React.TouchEvent} e - The touch event.
     */
    const handleTouchStart = (e: React.TouchEvent) => {
        // Record the starting X coordinate of the touch
        touchStartX = e.touches[0].clientX;
    };

    /**
     * Event handler function for touch end event.
     * Calculates the difference between the starting and ending X coordinates of the touch.
     * Moves to the next or previous slide based on the touch difference.
     * @param {React.TouchEvent} e - The touch event.
     */
    const handleTouchEnd = (e: React.TouchEvent) => {
        // Retrieve the ending X coordinate of the touch
        const touchEndX = e.changedTouches[0].clientX;

        // Calculate the difference between the starting and ending X coordinates of the touch
        const touchDiff = touchStartX - touchEndX;

        // If the touch difference is greater than 50 pixels, move to the next slide
        if (touchDiff > 50) {
            nextSlide();
        }
        // If the touch difference is less than -50 pixels, move to the previous slide
        else if (touchDiff < -50) {
            prevSlide();
        }
    };

    return (
        <section
            id="photo-carousel-container"
            className="group relative m-auto mb-28 mt-9  h-[600px] w-full"
            aria-label="Image Carousel"
        >
            {slides.map((slide, slideIndex) => (
                <div
                    // Slide container
                    key={slide.url}
                    className={`relative h-full w-full bg-cover bg-center duration-500 ${
                        slideIndex === currentIndex ? "" : "hidden"
                    }`}
                    style={{ backgroundImage: `url(${slide.url})` }}
                    role="img"
                    aria-label={`Slide ${currentIndex + 1}`}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="absolute bottom-[-7%] w-full text-center text-gray-500">
                        <p className="text-sm">{slide.caption}</p>
                    </div>
                </div>
            ))}

            {/* Previous slide button */}
            <button
                id="previous-button"
                className="absolute left-0 top-1/2 hidden h-[100%] -translate-y-1/2 cursor-pointer bg-black/30 p-4 text-white opacity-0 transition-opacity duration-500 hover:bg-black/50 hover:text-amber-500 group-hover:opacity-100 lg:block"
                onClick={prevSlide}
                aria-label="Previous Slide"
            >
                <BsChevronCompactLeft size={30} />
            </button>

            {/* Next slide button */}
            <button
                id="next-button"
                className="absolute right-0 top-1/2 hidden h-[100%] -translate-y-1/2 cursor-pointer bg-black/30 p-4 text-white opacity-0 transition-opacity duration-500 hover:bg-black/50 hover:text-amber-500 group-hover:opacity-100 lg:block"
                onClick={nextSlide}
                aria-label="Previous Slide"
            >
                <BsChevronCompactRight size={30} />
            </button>

            {/* Slide navigation buttons */}
            <div
                id="photo-carousel-navigation"
                className="top-4 mt-12 flex justify-center py-2"
                role="tablist"
                aria-label="Slide Navigation"
            >
                {slides.map((slide, slideIndex) => (
                    <button
                        key={slide.url}
                        className={`cursor-pointer text-4xl ${
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
        </section>
    );
}
