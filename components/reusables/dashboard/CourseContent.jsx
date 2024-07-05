"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CourseContent = ({ courseIcon, title, mainMessage, subMessage }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col items-start gap-y-2">
        <span className="cursor-pointer" onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-pri10 font-bold" />
        </span>
        <h1 className="text-pri10 text-2xl font-semibold">{title}</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 mt-[4rem]">
        {courseIcon}
        <div className="text-center">
          <p className="text-pri10 font-medium text-xl">{mainMessage}</p>
          <Link
            href=""
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
