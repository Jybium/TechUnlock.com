import React from "react";
import CourseCard from "../learn-pace/course-card";
import courses from "@/data/courses";
import line from "@/assets/landing-page/Line.svg";
import sideImage from "@/assets/landing-page/ColoredAngle.svg";
import Image from "next/image";

const ProgramsOffered = () => {
  return (
    <div className="relative my-[5rem] w-[90%] mx-auto">
      <div className="relative">
        <p className="relative g">
          <Image
            src={line}
            alt="line"
            className="absolute top-9 w-[22%] mx-auto"
          />
          <span className="text-center text-3xl font-semibold text-first-primary">
            Programs Offered
          </span>
        </p>
      </div>

      <div className="flex flex-wrap mt-8 mx-auto gap-y-3">
        {courses.map((course, index) => (
          <div key={index} className="w-full p-2">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsOffered;
