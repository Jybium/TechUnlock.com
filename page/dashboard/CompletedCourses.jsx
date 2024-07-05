import CourseContent from "@/components/reusables/dashboard/CourseContent";
import { CompletedCoursesIcon} from "@/components/svgs";
import React from "react";

const CompletedCourses =
  () => {
    return (
      <div>
        <CourseContent
          courseIcon={
            <CompletedCoursesIcon />
          }
          title="Completed courses"
          mainMessage="You are yet to complete a course."
          subMessage="Continue learning."
        />
      </div>
    );
  };

export default CompletedCourses;
