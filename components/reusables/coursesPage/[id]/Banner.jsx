import React from "react";
import Image from "next/image";
import { BannerCard } from "./BannerCard";
import Rating from "../../landingPage/Rating";

//IMAGES

// UI/UX
import UIBanner from "@/assets/course-page/UIBanner.svg";

// AI
import AIBanner from "@/assets/course-page/AICard.svg";

// Web Development
import WebBanner from "@/assets/course-page/webDevBanner.svg";

// cybersecurity
import cyber from "@/assets/course-page/cybersecurityCard.svg";

// DM
import DM from "@/assets/course-page/DMCard.svg";

export const categoryMap = {
  CYBER: "Cybersecurity",
  WEB: "Web Development",
  DM: "Digital Marketing",
  "UI/UX": "UI/UX Design",
  AI: "Artificial Intelligence",
};

const Banner = ({ course }) => {
  const fullCategoryName = categoryMap[course?.category] || course?.category;
  return (
    <div className="">
      <div className="relative lg:h-screen w-full lg:flex lg:items-end lg:justify-center bg-gradient-to-tr from-[#13485B] to-[#06212B]">
        <Image
          src={
            course?.category === "UI/UX"
              ? UIBanner
              : course?.category === "WEB"
              ? WebBanner
              : course?.category === "CYBER"
              ? cyber
              : course?.category === "DM"
              ? DM
              : AIBanner
          }
          alt="course banner"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
        />

        <div className="relative flex justify-between gap-x-6 h-[90vh] w-[95%] mx-auto pb-10">
          <div className="flex flex-col justify-between w-[65%] text-[#FCFCFD]">
            <h1 className=" text-[#FCFCFD] font-semibold text-2xl">
              Get started with your{" "}
              <span className="font-bold text-pri1"> {fullCategoryName} </span>{" "}
              Journey today.
            </h1>

            <p className="text-xl">{course?.description}</p>

            <div className="w-2/4 bg-[#FFFFFF]/40 backdrop-blur-lg drop-shadow-md px-5 py-3 rounded-md text-sm">
              <div className="mb-4 flex justify-between">
                <p className="">
                  {course?.title}{" "}
                  <span>
                    {!course?.is_paid
                      ? "(Free)"
                      : `(# ${Number(course?.price).toFixed(0)})`}
                  </span>
                </p>
                <Rating rating={course?.rating || 4.5} />
              </div>
              <div className="flex justify-between">
                <p className="">
                  Rating: <span>{course?.rating || 5.0}</span>
                </p>
                <p className="">
                  Total Enrolled: <span>{course?.enrolled || "1, 500"}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 absolute -bottom-12 right-0 z-20 w-[30%] ml-auto">
            <BannerCard courses={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
