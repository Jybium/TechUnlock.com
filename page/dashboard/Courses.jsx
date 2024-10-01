"use client";

import React, { useEffect } from "react";
import { useCourses } from "@/Context/courses";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import CourseCard from "@/components/reusables/dashboard/AdminCourseCard";

const Courses = () => {
  const { courses, loading } = useCourses();
  const [filteredCourses, setFilteredCourses] = React.useState([]);

  useEffect(() => {
    setFilteredCourses(courses.courses);
  }, [courses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-[90%] mx-auto space-y-7 my-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-pri10">All Courses</h1>
        <h1 className="text-xl font-bold text-pri10">
          {filteredCourses?.length}
        </h1>
      </div>

      <div className="">
        <div className="grid gap-y-5 mb-5 lg:mb-10">
          {filteredCourses?.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>

        {filteredCourses?.length === 0 && (
          <p className="text-center text-semibold text-lg text-pri10">
            No courses available
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;
