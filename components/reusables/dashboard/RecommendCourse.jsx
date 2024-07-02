import React from "react";
import Link from "next/link";
import courseOffered from "@/data/coursesOffered";
import CourseCard from "./CourseCard";

const RecommendCourse = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between text-lg">
        <h1 className="">Recommended courses for you</h1>
        <Link href="" className="text-[#82D1EE] font-semibold hover:underline">
          View more
        </Link>
      </div>

      <div className="w-[95%] mx-auto grid grid-cols-2 lg:grid-cols-3 mt-8 gap-6">
        {courseOffered.map((item) => (
          <CourseCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default RecommendCourse;
