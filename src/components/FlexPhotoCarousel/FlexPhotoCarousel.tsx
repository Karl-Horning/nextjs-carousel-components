"use client";

import Image from "next/image";
import { useState } from "react";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";

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
        setSlideIndex((index) =>
            index === slides.length - 1 ? 0 : index + 1
        );
    };

    return (
        <div className="w-full h-full relative">
            <Image
                className="w-full h-full object-cover block box-border"
                height={780}
                width={1400}
                layout="responsive"
                src={slides[slideIndex].url}
                alt=""
            />
            <button
                onClick={showPrevSlide}
                className="block absolute top-0 bottom-0 p-4 cursor-pointer left-0 hover:bg-black/10 transition-colors duration-100 ease-in-out"
            >
                <LuArrowBigLeft className="fill-black stroke-white h-8 w-8" />
            </button>
            <button
                onClick={showNextSlide}
                className="block absolute top-0 bottom-0 p-4 cursor-pointer right-0 hover:bg-black/10 transition-colors duration-100 ease-in-out"
            >
                <LuArrowBigRight className="fill-black stroke-white h-8 w-8" />
            </button>
        </div>
    );
}
