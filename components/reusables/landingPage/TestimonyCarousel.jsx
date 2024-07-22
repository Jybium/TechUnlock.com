"use client";

import React, { useState, useEffect, useRef } from "react";
import testimony from "@/data/testimony";
import TestimonyCard from "./TestimonyCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimony.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimony.length) % testimony.length
    );
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 3000); // Reset interval when slide changes
  }, [currentIndex]);

  return (
    <div className="bg-pri1 w-[95%] mx-auto shadow-md overflow-hidden relative">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimony.map((testimony, index) => (
          <div key={index} className="min-w-full">
            <TestimonyCard data={testimony} />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
};

export default TestimonyCarousel;
