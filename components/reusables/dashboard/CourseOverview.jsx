import { courseType } from "@/data/dashboard";
import React from "react";
import CourseOverviewCard from "./CourseOverviewCard";

const CourseOverview = () => {
  return (
    <div className="space-y-4 mb-6">
      <div className="font-semibold text-pri10">
        <p>Course overview</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
        {/* Course cards */}
        {courseType.map((item) => (
          <CourseOverviewCard
            count={item.value}
            title={item.name}
            image={item.icon}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseOverview;
