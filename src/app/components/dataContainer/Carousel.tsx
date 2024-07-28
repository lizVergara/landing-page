"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAppSelector } from "../../../app/store/hooks";
import { selectImages } from "../../../app/features/profile/profileSlice";
import imagePlaceholder from "../../../../public/images/imagePlaceholder.png";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesList = useAppSelector(selectImages);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imagesList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === imagesList.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative pb-5 w-full h-64 sm:h-96 md:h-128 lg:h-144">
      <div className="relative w-full h-64 sm:h-96 md:h-128 lg:h-144">
        <div className="overflow-hidden h-full rounded-lg bg-form-bg">
          {imagesList.map((image, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                quality={50}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
            </div>
          ))}
        </div>
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full bg-opacity-70"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full bg-opacity-70"
        >
          ›
        </button>
      </div>{" "}
      <div className="absolute my-2 w-full flex justify-center">
        <div className="relative flex items-center h-10 w-40 bg-form-bg rounded-full px-4">
          <button
            onClick={goToPrevious}
            className="absolute left-2 text-white p-1 rounded-full bg-opacity-70"
          >
            ‹
          </button>
          <div className="flex-grow flex justify-center items-center space-x-2">
            {imagesList.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={goToNext}
            className="absolute right-2 text-white p-1 rounded-full bg-opacity-70"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
