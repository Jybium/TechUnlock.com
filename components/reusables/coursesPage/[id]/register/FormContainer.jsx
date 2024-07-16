import React from "react";
import Image from "next/image";
import image from "@/assets/landing-page/authImage.png";
import line from "@/assets/landing-page/Line.svg";
import RegisterCourseForm from "@/components/forms/RegisterCourseForm";

const FormContainer = () => {
  return (
    <div className="w-full mt-[3rem]">
      {/* This is the section header */}
      <div className="relative">
        <p className="relative grid justify-center content-center">
          <Image
            src={line}
            alt="line"
            className="absolute left-[42%] top-9 w-[16%] mx-auto"
          />
          <span className="text-center text-3xl font-semibold text-first-primary">
            Registration Form
          </span>
        </p>
      </div>

      {/* This part renders the registeration */}
      <div className="bg-pri10 my-[2rem] px-[3.31rem] py-[4rem]">
        <div className="flex justify-between items-center gap-x-8">
          {/* The part renders the form UI */}
          <div className="md:w-1/2 bg-transparent">
            <RegisterCourseForm />
          </div>

          <div className="md:w-3/6 hidden lg:block">
            <Image
              src={image}
              alt="a lady holding a laptop"
              className="block object-cover w-full h-4/6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
