"use client";

import Image from "next/image";
import { useState } from "react";
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
    url: string;
    alt?: string;
};

/**
 * Props for the Photo Carousel component.
 */
interface FlexPhotoCarouselProps {
    slides: Slide[]; // Array of slides to display in the carousel
    slideDelay: number; // Delay between slides in seconds
}

export default function FlexPhotoCarousel({
    slides,
    slideDelay,
}: FlexPhotoCarouselProps) {
    const [slideIndex, setSlideIndex] = useState(0);

    const showPrevSlide = () => {
        setSlideIndex((index) => (index === 0 ? slides.length - 1 : index - 1));
    };

    const showNextSlide = () => {
        setSlideIndex((index) => (index === slides.length - 1 ? 0 : index + 1));
    };

    return (
        <section
            id="flex-photo-carousel"
            aria-label="Photo Carousel"
            className="w-full h-full relative"
        >
            <div
                id="slide-container"
                className="w-full h-full flex"
                style={{ overflow: "hidden" }}
            >
                {slides.map(({ url, alt }, index) => (
                    <Image
                        className="w-full h-full object-cover block box-border flex-shrink-0 flex-grow-0 transition-all delay-300 ease-in-out"
                        height={800}
                        width={1400}
                        layout="responsive"
                        src={url}
                        alt={alt || ""}
                        aria-hidden={slideIndex !== index}
                        key={url}
                        style={{ translate: `${-100 * slideIndex}%` }}
                    />
                ))}
            </div>
            <button
                id="prev-button"
                onClick={showPrevSlide}
                className={`${style["slide-button"]} block absolute top-0 bottom-0 p-4 cursor-pointer left-0 hover:bg-black/10 focus-visible:bg-black/10 transition-colors duration-100 ease-in-out`}
                aria-label="View previous slide"
            >
                <LuArrowBigLeft
                    aria-hidden
                    className="fill-black stroke-white h-8 w-8"
                />
            </button>
            <button
                id="next-button"
                onClick={showNextSlide}
                className={`${style["slide-button"]} block absolute top-0 bottom-0 p-4 cursor-pointer right-0 hover:bg-black/10 focus-visible:bg-black/10 transition-colors duration-100 ease-in-out`}
                aria-label="View next slide"
            >
                <LuArrowBigRight
                    aria-hidden
                    className="fill-black stroke-white h-8 w-8"
                />
            </button>
            <div
                id="slide-navigation"
                className="absolute bottom-2 left-[50%] translate-x-[-50%] translate-y-[-50%] flex gap-1"
            >
                {slides.map((_, index) => (
                    <button
                        className={`${style["slide-pagination"]} h-4 w-4 block`}
                        onClick={() => setSlideIndex(index)}
                        key={index}
                        aria-label={`View slide ${index + 1}`}
                    >
                        {index === slideIndex ? (
                            <LuCircleDot
                                aria-hidden
                                className="stroke-white fill-black h-full w-full"
                            />
                        ) : (
                            <LuCircle
                                aria-hidden
                                className="stroke-white fill-black h-full w-full"
                            />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}
