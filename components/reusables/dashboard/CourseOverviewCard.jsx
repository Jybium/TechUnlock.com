import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const CourseOverviewCard = ({ title, count, image }) => {
  console.log(image);
  return (
    <div className="bg-[#13485B] rounded-lg drop-shadow shadow text-white w-full">
      <div className="flex justify-between items-center px-5 pb-3 pt-4">
        <div className="w-1/3">
          {image ? (
            <Image src={image} alt={title} className="" />
          ) : (
            <div className="w-16 h-16 bg-black" />
          )}
        </div>
        <div className="text-center w-1/3">
          <p className="text-sm">{title}</p>
          <p className="text-2xl font-semibold">{count}</p>
        </div>
        <div className="w-1/3"></div>
      </div>
      <hr className="" />
      <div className="flex items-center  px-5 py-3">
        <p className="">View courses</p>
        <ArrowRight />
      </div>
    </div>
  );
};

export default CourseOverviewCard;
