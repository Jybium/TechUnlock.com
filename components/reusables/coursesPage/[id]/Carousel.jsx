"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CarouselContainer = styled.div.attrs({
  className:
    "relative flex flex-col items-center gap-x-5 py-[2rem] justify-center w-full max-w-4xl mx-auto bg-transparent",
})``;

const SlideContainer = styled.div.attrs({
  className: "flex w-full h-96 bg-transparent",
})`
  position: relative;
`;

const ImageContainer = styled.div`
  ${({ image }) => `
    background-image: url(${image});
  `}
  @apply w-1/2 h-full bg-center bg-cover bg-primary transition-opacity duration-500 ease-in-out bg-transparent;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentContainer = styled.div.attrs({
  className:
    "w-1/2 flex flex-col justify-between p-4 bg-transparent transition-opacity duration-500 ease-in-out",
})`
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const TextContent = styled.div.attrs({
  className: "flex-grow flex flex-col gap-y-6 text-[#EAF7FC]",
})``;

const NavigationButtons = styled.div.attrs({
  className: "flex justify-between w-1/2 mx-auto text-black",
})``;

const Button = styled.button.attrs({
  className:
    "h-12 w-12 flex items-center justify-center text-black rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:drop-shadow-md hover:text-white transition-all duration-300 ease-in-out",
})``;

const DotsContainer = styled.div.attrs({
  className:
    "absolute bottom-0 flex z-20 rounded-xl h-4 w-[10%] p-3 items-center justify-center space-x-2 bg-white",
})``;

const Dot = styled.div`
  width: 0.75rem; /* 3px */
  height: 0.75rem; /* 3px */
  background-color: ${({ active }) =>
    active
      ? "#101828"
      : "#d1d5db"}; /* bg-primary when active, bg-gray-400 when inactive */
  border-radius: 9999px; /* full rounded */
  cursor: pointer;
`;

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 8000);
    return () => clearInterval(slideInterval.current);
  }, [currentSlide]);

  return (
    <CarouselContainer>
      <SlideContainer>
        {slides.map((slide, index) => (
          <ImageContainer
            key={index}
            image={slide.image}
            isActive={index === currentSlide}
          />
        ))}
        <ContentContainer isActive={true}>
          <TextContent>
            <h1 className="text-4xl font-semibold">Course add-ons</h1>
            <div className="grid gap-y-1">
              <h2 className="text-2xl font-semibold">
                {slides[currentSlide].title}
              </h2>
              <p className="text-white">{slides[currentSlide].description}</p>
            </div>
          </TextContent>
          <NavigationButtons>
            <Button className="rounded-full bg-white" onClick={prevSlide}>
              <ChevronLeft size={22} />
            </Button>
            <Button className="rounded-full bg-white" onClick={nextSlide}>
              <ChevronRight size={22} />
            </Button>
          </NavigationButtons>
        </ContentContainer>
      </SlideContainer>
      <DotsContainer>
        {slides.map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default Carousel;
