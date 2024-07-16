import React from "react";
import Carousel from "./Carousel";

const CourseAddOn = ({ course }) => {
  const slides = course?.addon;

  return (
    <div className="relative mx-[4rem] py-[1rem] mt-[3rem] mb-7 bg-gradient-to-tr from-[#1C6B88] to-[#0F1B2B]">
      <Carousel slides={slides} />
    </div>
  );
};

export default CourseAddOn;
