"use client";

import CourseContent from "@/components/reusables/dashboard/CourseContent";
import { CompletedCoursesIcon } from "@/components/svgs";
import React, { useEffect, useState } from "react";
import { getCompletedCourses } from "@/services/course";

const CompletedCourses = () => {
  const [hasCompleted, setHasCompleted] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCompletedCourses();
        setHasCompleted(Boolean(data?.completed_courses?.length));
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="h-full">
      <CourseContent
        courseIcon={<CompletedCoursesIcon />}
        title="Completed courses"
        mainMessage={
          hasCompleted
            ? "Great job! View your certificates."
            : "You are yet to complete a course."
        }
        subMessage={hasCompleted ? "View completed" : "Continue learning."}
      />
    </div>
  );
};

export default CompletedCourses;
