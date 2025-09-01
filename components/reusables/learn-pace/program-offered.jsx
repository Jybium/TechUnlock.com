"use client";

import React from "react";
import CourseCard from "../learn-pace/course-card";
import courses from "@/data/courses";
import line from "@/assets/landing-page/Line.svg";
import sideImage from "@/assets/landing-page/ColoredAngle.svg";
import Image from "next/image";
import { useCourses } from "@/Context/courses";
import LoadingSpinner from "../LoadingSpinner";

const ProgramsOffered = () => {
  const { courses, loading } = useCourses();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative lg:my-[6rem] my-[4rem] w-[90%] mx-auto lg:mt-48">
      <div className="relative">
        <p className="relative g">
          <Image
            src={line}
            alt="line"
            className="absolute top-9 lg:w-[22%] w-[70%] mx-auto"
          />
          <span className="text-center text-3xl font-semibold text-first-primary">
            Programs Offered
          </span>
        </p>
      </div>

      <div className="flex flex-wrap mt-8 mx-auto gap-y-3">
        {courses?.courses?.map((course, index) => (
          <div key={index} className="w-full p-2">
            <CourseCard item={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsOffered;
