import React from "react";
import Image from "next/image";
import line from "@/assets/landing-page/Line.svg";
import FeedbackCard from "./FeedbackCard";
import angleUp from "@/assets/course-page/ColouredUpAngle.svg";
import angleDown from "@/assets/course-page/ColouredDownAngle.svg";

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
            className="absolute left-0 top-7 w-[12%] mx-auto"
          />
          <span className="text-left text-2xl font-semibold text-pri10">
            Feedbacks
          </span>
        </p>
      </div>

      <div className="relative grid lg:flex lg:justify-between lg:gap-x-6 gap-y-3 lg:gap-y-0 w-[90%] mx-auto z-30">
        <FeedbackCard course={course} />
        <FeedbackCard course={course} />
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
