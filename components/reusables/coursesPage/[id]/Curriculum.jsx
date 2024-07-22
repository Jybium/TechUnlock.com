import React from "react";
import Overview from "./Overview";
import line from "@/assets/landing-page/Line.svg";
import Image from "next/image";

const Curriculum = ({ course }) => {
  return (
    <div className="relative bg-pri1">
      <div className="w-[90%] mx-auto pt-5">
        <div className="relative">
          <p className="relative">
            <Image
              src={line}
              alt="line"
              className="absolute left-0 top-8 w-[10%] mx-auto"
            />
            <span className="text-2xl text-left font-semibold text-first-primary">
              Overview
            </span>
          </p>
        </div>
        <div className="w-full bg-pri1 py-[2rem]">
          <Overview course={course} />
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
