import React from "react";
import {BackIcon} from "@/components/svgs";


const CourseContent =
  ({
    courseIcon,
    title,
    mainMessage,
    subMessage,
  }) => {
    return (
      <div className="flex-grow p-4 flex flex-col gap-20">
        <div className="flex flex-col items-start gap-4">
          <BackIcon />
          <h1 className="text-pri10 text-2xl font-semibold">
            {title}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          {courseIcon}
          <div className="text-center">
            <p className="text-pri10 font-medium text-xl">
              {mainMessage}
            </p>
            <p className="text-pri7 font-medium text-xl">
              {subMessage}
            </p>
          </div>
        </div>
      </div>
    );
  };

export default CourseContent;
