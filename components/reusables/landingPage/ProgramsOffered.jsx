import React from 'react'
import CourseCard from "./CourseCard";
import courses from '@/data/courses';
import line from "@/assets/landing-page/Line.svg";
import sideImage from "@/assets/landing-page/ColoredAngle.svg";
import Image from 'next/image';


const ProgramsOffered = () => {
  return (
    <div className="relative my-[5rem]">
      
        <Image
          src={sideImage}
          alt="side-image"
          className="absolute left-0 -top-[11%] w-[15%] -z-10"
        />
      <div className="relative">

        <p className="relative grid justify-center content-center">
          <Image
            src={line}
            alt="line"
            className="absolute left-[39%] top-9 w-[22%] mx-auto"
          />
          <h2 className="text-center text-3xl font-semibold text-first-primary">
            Programs Offered
          </h2>
        </p>
      </div>

      <div className="flex flex-wrap mt-8 w-[95%] mx-auto gap-y-3">
        {courses.map((course, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 p-2">
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramsOffered





