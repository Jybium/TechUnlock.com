import React from "react";
import Image from "next/image";
import line from "@/assets/landing-page/Line.svg";
import FeedbackCard from "./FeedbackCard";
import angleUp from "@/assets/course-page/ColouredUpAngle.svg";
import angleDown from "@/assets/course-page/ColouredDownAngle.svg";

const FeedbackContainer = () => {
  return (
    <div className="relative h-[80vh] mb-[6rem]">
      <div className="absolute -top-1/3 left-0 w-1/5 h-[80vh] overflow-hidden ">
        <Image
          src={angleDown}
          alt="Decorative angle"
          layout="fill"
          objectFit="contain"
          objectPosition="top left"
        />
      </div>

         <div className="relative my-3">
        <p className="relative grid">
          <Image
            src={line}
            alt="line"
            className="absolute left-[39%] top-9 w-[10%] mx-auto"
          />
          <span className="text-left text-3xl font-semibold text-darkblue">
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
