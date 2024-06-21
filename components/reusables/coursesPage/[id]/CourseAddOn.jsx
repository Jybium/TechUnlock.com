import Image from "next/image";
import React from "react";
import slides from "@/data/courseAddon";
import Carousel from "./Carousel";

const CourseAddOn = () => {
  return (
    <div className="relative mx-[4rem] py-[2rem] mt-[5rem] mb-10 bg-gradient-to-tr from-[#1C6B88] to-[#0F1B2B]">
      <Carousel slides={slides} />
    </div>
  );
};

export default CourseAddOn;
