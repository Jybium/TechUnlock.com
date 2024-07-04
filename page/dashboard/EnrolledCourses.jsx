import CourseContent from "@/components/reusables/dashboard/CourseContent";
import { EnrolledIcon } from "@/components/svgs";
import React from "react";

const EnrolledCourses =
  () => {
    return (
      <div>
        <CourseContent
          courseIcon= {<EnrolledIcon />}
          title="Enrolled courses"
          mainMessage="You are yet to enroll for a course."
          subMessage="Enroll now."
        />
      </div>
    );
  };

export default EnrolledCourses;
