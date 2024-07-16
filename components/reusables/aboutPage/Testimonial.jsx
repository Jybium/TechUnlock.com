"use client";

import React, { useEffect, useState } from "react";
import testimonial from "@/data/testimonial";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonial.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonial.length - 1 : prevIndex - 1
    );
  };

  // Automatically change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-pri10 relative mt-[4rem]">
      <p className="pt-7 font-semibold text-4xl text-white text-center">
        Impacting the World
      </p>
      <div className="flex justify-between items-center h-full">
        <button
          className="bg-white hover:text-white hover:bg-[#82D1EE] h-10 w-10 flex items-center justify-center rounded-full absolute left-4 z-10"
          onClick={prevSlide}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="w-5/6 mx-auto py-[3rem] overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonial.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
        <button
          className="bg-white hover:text-white hover:bg-[#82D1EE] h-10 w-10 flex items-center justify-center rounded-full absolute right-4 z-10"
          onClick={nextSlide}
        >
          <ChevronRight size={20} className="hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
