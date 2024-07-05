import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const CourseOverviewCard = ({ title, count, image }) => {
  return (
    <div className="bg-darkblue rounded-lg drop-shadow shadow text-white w-full">
      <div className="flex justify-between items-center px-5 pb-3 pt-4">
        <div className="w-1/3">
          <Image src={image} alt={`${image} image`} className="" />{" "}
        </div>
        <div className="text-center w-1/3">
          <p className="text-sm">{title}</p>
          <p className="text-2xl font-semibold">{count}</p>
        </div>
        <div className="w-1/3"></div>
      </div>
      <hr className="" />
      <div className="flex items-center justify-between px-5 py-3">
        <p className="">View courses</p>
        <ArrowRight />
      </div>
    </div>
  );
};

export default CourseOverviewCard;
