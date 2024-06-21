import React from "react";
import Image from "next/image";
import line from "@/assets/landing-page/Line.svg";
import FeedbackCard from "./FeedbackCard";
import angleUp from "@/assets/course-page/ColouredUpAngle.svg";
import angleDown from "@/assets/course-page/ColouredDownAngle.svg";

const FeedbackContainer = () => {
  return (
    <div className="relative h-[80vh] mb-[5rem]">
      <div className="absolute -top-1/4 left-0 w-1/5 h-[80vh] overflow-hidden ">
        <Image
          src={angleDown}
          alt="Decorative angle"
          layout="fill"
          objectFit="contain"
          objectPosition="top left"
        />
      </div>

      <div className="relative mb-10 ml-16">
        <p className="relative grid">
          <Image
            src={line}
            alt="line"
            className="absolute left-0 top-9 w-[14%] mx-auto"
          />
          <span className="text-left text-3xl font-semibold text-pri10">
            Feedbacks
          </span>
        </p>
      </div>

      <div className="relative flex justify-between gap-x-6 w-[90%] mx-auto z-30">
        <FeedbackCard />
        <FeedbackCard />
      </div>

      <div className="absolute -bottom-1/2 right-0 w-1/5 h-[80vh] overflow-hidden ">
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
