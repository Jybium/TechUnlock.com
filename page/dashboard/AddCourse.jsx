"use client";

import React from "react";
import dynamic from "next/dynamic";
const AddCourseForm = dynamic(()=>  import("@/components/forms/AddCourseForm"),{ssr: false});

const AddCourse = () => {
  return (
    <div className="">
      <AddCourseForm />
    </div>
  );
};

export default AddCourse;
