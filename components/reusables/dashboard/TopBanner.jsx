import React from "react";
import Image from "next/image";

import profileImage from "@/assets/dashboard/profileImage.svg";
import Link from "next/link";

const TopBanner = () => {
  return (
    <div className="bg-gradient-to-br from-[#1C6B88] to-[#06212B] rounded p-4 w-full">
      {/* TOP BANNER BODY */}
      <div className="flex items-center gap-x-14 w-[97%] ml-auto">
        <div className="">
          <Image src={profileImage} alt="Profile image" className="" />
        </div>

        <div className="text-[#FCFCFD] space-y-3">
          <p>Good to have you here, Johnson</p>
          <p>
            Get started on your learning streak by selecting a course of your
            choice.
          </p>
          <p>
            You are currently not offering any Courses.{" "}
            <Link href="" className="text-[#82D1EE]">
              Get Started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
