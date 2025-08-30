"use client";

import React from "react";
import Link from "next/link";
import courseOffered from "@/data/coursesOffered";
import CourseCard from "./CourseCard";
import { Search } from "lucide-react";
import { useCourses } from "@/Context/courses";

const RecommendCourse = React.memo(() => {
  const { courses } = useCourses();

  console.log(courses);

  return (
    <div className="">
      <div className="flex items-center justify-between text-lg">
        <h1 className="font-semibold text-[#13485B]">
          Available courses for you
        </h1>
      </div>

      <div className="relative w-1/2 mt-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search for courses"
          className="w-full bg-white rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="w-[95%] mx-auto grid grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
        {courses?.courses?.map((item) => (
          <CourseCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
});

RecommendCourse.displayName = "RecommendCourse";

export default RecommendCourse;
