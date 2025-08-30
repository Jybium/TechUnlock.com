"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CourseContent = ({ courseIcon, title, mainMessage, subMessage }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-col items-center justify-center gap-6 mt-[7rem]">
        {courseIcon}
        <div className="text-center space-y-4">
          <p className="text-pri10 font-medium text-xl">{mainMessage}</p>
          <Link
            href="/dashboard/courses"
            className="text-pri7 font-medium text-xl hover:underline"
          >
            {subMessage}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
