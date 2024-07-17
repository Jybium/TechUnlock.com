import React from "react";
import Image from "next/image";
import image from "@/assets/landing-page/programs.svg";
import angleImage from "@/assets/landing-page/uncoloredAngle.svg";
import programStructure from "@/data/programs";

const OurPrograms = () => {
  return (
    <div className="relative w-full my-[5rem]">
      <div className="w-[95%] mx-auto flex justify-between items-center">
        <div className="grid gap-y-2 lg:w-[45%]">
          {programStructure.map((program, index) => (
            <div className="" key={program.id}>
              <h3 className="text-primary text-3xl font-bold">
                {program.title}
              </h3>
              <ul className="list-disc grid gap-y-1 mt-6 ml-6">
                {program.description.map((desc, index) => (
                  <li key={index} className="text-gray-900">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative w-[45%] h-2/3 hidden lg:block">
          <Image
            src={image}
            alt="our program structure"
            className="max-w-full h-2/3 block object-contain"
          />
        </div>
      </div>
      <Image
        src={angleImage}
        alt="background angle"
        className="absolute right-0 -bottom-1/3 w-[20%] -z-10 hidden lg:block"
      />
    </div>
  );
};

export default OurPrograms;
