"use client";

import CourseContent from "@/components/reusables/dashboard/CourseContent";
import { EnrolledIcon } from "@/components/svgs";
import React, { useEffect, useState } from "react";
import { getEnrolledCourses } from "@/services/course";

const EnrolledCourses = () => {
  const [hasEnrolled, setHasEnrolled] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getEnrolledCourses();
        setHasEnrolled(Boolean(data?.enrolled_courses?.length));
      } catch {}
    };
    load();
  }, []);

  return (
    <div className="h-full">
      <CourseContent
        courseIcon={<EnrolledIcon />}
        title="Enrolled courses"
        mainMessage={
          hasEnrolled
            ? "View your enrolled courses."
            : "You are yet to enroll for a course."
        }
        subMessage={hasEnrolled ? "Go to My Courses" : "Enroll now."}
      />
    </div>
  );
};

export default EnrolledCourses;
