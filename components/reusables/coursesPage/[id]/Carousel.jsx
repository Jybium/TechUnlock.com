"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Image from "next/image";

const CarouselContainer = styled.div.attrs({
  className:
    "relative flex flex-col-reverse md:flex-row items-center gap-x-5 pt-[1rem] pt-[1rem] md:px-[2rem] pb-[2rem] justify-center w-full w-[90%] mx-auto bg-transparent",
})``;

const SlideContainer = styled.div.attrs({
  className: "relative w-1/2 overflow-hidden",
})`
  display: flex;
  align-items: center;
`;

const SlideWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentSlide }) => `translateX(-${currentSlide * 100}%)`};
  width: 100%;
`;

const ImageWrapper = styled.div`
  min-width: 100%;
  height: 100%;
  display: block;
  @apply lg:relative;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div.attrs({
  className:
    "w-full relative h-full lg:w-1/2 flex flex-col justify-between p-4 bg-transparent transition-opacity duration-500 ease-in-out",
})`
  opacity: ${({ isactive }) => (isactive ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  @apply lg:relative;
`;

const TextContent = styled.div.attrs({
  className:
    "flex-grow flex flex-col gap-y-3 md:gap-y-6 pb-[2rem] text-[#EAF7FC]",
})``;

const NavigationButtons = styled.div.attrs({
  className: "flex justify-between w-1/2 mx-auto text-black",
})``;

const Button = styled.button.attrs({
  className:
    "h-10 w-10 flex items-center justify-center text-black rounded-full hover:bg-white/10 hover:backdrop-blur-lg hover:drop-shadow-md hover:text-white transition-all duration-300 ease-in-out",
})``;

const DotsContainer = styled.div.attrs({
  className:
    "absolute bottom-0 flex z-20 rounded-xl h-4 w-fit p-3 items-center justify-center space-x-2 bg-white",
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
  console.log(slides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    slideInterval.current = setInterval(nextSlide, 8000);
    return () => clearInterval(slideInterval.current);
  }, [currentSlide, slideInterval]);

  return (
    <CarouselContainer>
      <ContentContainer isactive={true}>
        <TextContent>
          <h1 className="text-2xl lg:text-4xl font-semibold">Course add-ons</h1>
          <div className="grid gap-y-1">
            <h2 className="text-2xl font-semibold">
              {slides &&
                currentSlide < slides.length &&
                slides[currentSlide].title}
            </h2>
            <p className="text-white">
              {slides &&
                currentSlide < slides?.length &&
                slides?.[currentSlide].description}
            </p>
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
      <SlideContainer>
        <SlideWrapper currentSlide={currentSlide}>
          {slides?.map((slide, index) => (
            <ImageWrapper key={index}>
              <StyledImage
                src={slide?.add_on_image}
                alt={slide?.title}
                width={300}
                height={300}
              />
            </ImageWrapper>
          ))}
        </SlideWrapper>
      </SlideContainer>
      <DotsContainer>
        {slides?.map((_, index) => (
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
