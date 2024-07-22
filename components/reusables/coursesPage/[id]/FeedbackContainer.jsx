"use client";

import React from "react";
import Image from "next/image";
import line from "@/assets/landing-page/Line.svg";
import FeedbackCard from "./FeedbackCard";
import angleUp from "@/assets/course-page/ColouredUpAngle.svg";
import angleDown from "@/assets/course-page/ColouredDownAngle.svg";

// Images
import ImageOne from "@/assets/course-page/feedback.jpg";
import ImageTwo from "@/assets/course-page/feedback-1.jpg";
import ImageThree from "@/assets/course-page/feedback-2.jpg";
import ImageFour from "@/assets/course-page/feedback-3.jpg";
import ImageFive from "@/assets/course-page/feedback-4.jpg";
import ImageSix from "@/assets/course-page/feedback-5.jpg";
import ImageSeven from "@/assets/course-page/feedback-6.jpg";
import ImageEight from "@/assets/course-page/feedback-7.jpg";
import ImageNine from "@/assets/course-page/feedback-8.jpg";
import ImageTen from "@/assets/course-page/feedback-9.jpg";

const FeedbackContainer = ({ course }) => {
  return (
    <div className="relative mb-[2rem] lg:h-[60vh] lg:mb-[4rem]">
      <div className="absolute hidden lg:block -top-1/4 left-0 w-1/5 h-[60vh] overflow-hidden ">
        <Image
          src={angleDown}
          alt="Decorative angle"
          layout="fill"
          objectFit="contain"
          objectPosition="top left"
        />
      </div>

      <div className="relative mb-6 ml-5 lg:ml-16">
        <p className="relative grid">
          <Image
            src={line}
            alt="line"
            className="absolute left-0 top-8 w-[31%] md:w-[10%] mx-auto"
          />
          <span className="text-left text-2xl font-semibold text-pri10">
            Feedbacks
          </span>
        </p>
      </div>

      <div className="relative grid lg:flex lg:justify-between lg:gap-x-6 gap-y-3 lg:gap-y-0 w-[90%] mx-auto z-30">
        <FeedbackCard
          course={course}
          image={
            course.category === "UI/UX"
              ? ImageOne
              : course.category === "WEB"
              ? ImageFour
              : course.category === "CYBER"
              ? ImageTwo
              : course.category === "DM"
              ? ImageThree
              : ImageFive
          }
        />
        <FeedbackCard
          course={course}
          image={
            course.category === "UI/UX"
              ? ImageSix
              : course.category === "WEB"
              ? ImageSeven
              : course.category === "CYBER"
              ? ImageEight
              : course.category === "DM"
              ? ImageNine
              : ImageTen
          }
        />
      </div>

      <div className="absolute hidden lg:block -bottom-1/2 right-0 w-1/5 h-[60vh] overflow-hidden ">
        <Image
          src={angleUp}
          alt="Decorative angle"
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
        />
      </div>
    </div>
  );
};

export default FeedbackContainer;
