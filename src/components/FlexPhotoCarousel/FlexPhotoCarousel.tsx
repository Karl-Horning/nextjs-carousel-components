"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
    LuArrowBigLeft,
    LuArrowBigRight,
    LuCircle,
    LuCircleDot,
} from "react-icons/lu";
import style from "./FlexPhotoCarousel.module.css";

/**
 * Represents a slide with its URL.
 */
type Slide = {
    url: string; // The URL of the slide image
    alt?: string; // Optional alternate text for the image
};

/**
 * Props for the Photo Carousel component.
 */
interface FlexPhotoCarouselProps {
    slides: Slide[]; // Array of slides to display in the carousel
    slideDelay: number; // Delay between slides in seconds
}

/**
 * FlexPhotoCarousel component.
 * @param {FlexPhotoCarouselProps} slides - Array of slides to display.
 * @param {FlexPhotoCarouselProps} slideDelay - Delay between slides in seconds.
 */
export default function FlexPhotoCarousel({
    slides,
    slideDelay,
}: Readonly<FlexPhotoCarouselProps>) {
    const [slideIndex, setSlideIndex] = useState(0); // State to track current slide index

    /**
     * Moves to the previous slide.
     */
    const showPrevSlide = useCallback(() => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    }, [slides.length]);

    /**
     * Moves to the next slide.
     */
    const showNextSlide = useCallback(() => {
        setSlideIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }, [slides.length]);

    // Effect to handle automatic slide transition
    useEffect(() => {
        const slideInterval = setInterval(() => {
            showNextSlide();
        }, 1000 * slideDelay);

        // Cleanup interval on component unmount
        return () => clearInterval(slideInterval);
    }, [showNextSlide, slideDelay]);

    // Effect to handle left and right arrows being used for slide transition
    useEffect(() => {
        /**
         * Event handler function to handle keyboard key press.
         * Calls `showPrevSlide` function on left arrow key press and `showNextSlide` function on right arrow key press.
         * @param {KeyboardEvent} event - The keyboard event.
         */
        const handleKeyPress = (event: KeyboardEvent) => {
            // Use the 'key' property to check which key is pressed
            if (event.key === "ArrowLeft") {
                showPrevSlide();
            } else if (event.key === "ArrowRight") {
                showNextSlide();
            }
        };

        // Add event listener for keydown event
        document.addEventListener("keydown", handleKeyPress);

        // Cleanup: remove event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [showPrevSlide, showNextSlide]);

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
            showNextSlide();
        }
        // If the touch difference is less than -50 pixels, move to the previous slide
        else if (touchDiff < -50) {
            showPrevSlide();
        }
    };

    return (
        <section
            id="flex-photo-carousel"
            aria-label="Photo Carousel"
            className="relative h-full w-full"
        >
            <div
                id="slide-container"
                className="flex h-full w-full"
                style={{ overflow: "hidden" }}
            >
                {slides.map(({ url, alt }, index) => (
                    <Image
                        className="box-border block h-full w-full flex-shrink-0 flex-grow-0 object-cover transition-all delay-300 ease-in-out"
                        height={800}
                        width={1400}
                        src={url}
                        alt={alt || ""}
                        aria-hidden={slideIndex !== index}
                        key={url}
                        style={{ translate: `${-100 * slideIndex}%` }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    />
                ))}
            </div>

            <button
                id="prev-button"
                onClick={showPrevSlide}
                className={`${style["slide-button"]} absolute bottom-0 left-0 top-0 block cursor-pointer p-4 transition-colors duration-100 ease-in-out hover:bg-black/10 focus-visible:bg-black/10`}
                aria-label="View previous slide"
            >
                <LuArrowBigLeft
                    aria-hidden
                    className="h-8 w-8 fill-black stroke-white"
                />
            </button>

            <button
                id="next-button"
                onClick={showNextSlide}
                className={`${style["slide-button"]} absolute bottom-0 right-0 top-0 block cursor-pointer p-4 transition-colors duration-100 ease-in-out hover:bg-black/10 focus-visible:bg-black/10`}
                aria-label="View next slide"
            >
                <LuArrowBigRight
                    aria-hidden
                    className="h-8 w-8 fill-black stroke-white"
                />
            </button>

            <div
                id="slide-navigation"
                className="absolute bottom-2 left-[50%] flex translate-x-[-50%] translate-y-[-50%] gap-1"
            >
                {slides.map(({ url }, index) => (
                    <button
                        className={`${style["slide-pagination"]} block h-4 w-4`}
                        onClick={() => setSlideIndex(index)}
                        key={url}
                        aria-label={`View slide ${index + 1}`}
                    >
                        {index === slideIndex ? (
                            <LuCircleDot
                                aria-hidden
                                className="h-full w-full fill-black stroke-white"
                            />
                        ) : (
                            <LuCircle
                                aria-hidden
                                className="h-full w-full fill-black stroke-white"
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
