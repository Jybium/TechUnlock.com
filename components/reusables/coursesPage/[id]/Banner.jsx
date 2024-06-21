import React from "react";
import Image from "next/image";
import { BannerCard } from "./BannerCard";
import Rating from "../../landingPage/Rating";

const Banner = ({ course }) => {
  return (
    <div className="">
      <div className="relative h-screen w-full flex items-end justify-center bg-gradient-to-tr from-[#13485B] to-[#06212B]">
        <Image
          src={course?.banner}
          alt="course banner"
          className="absolute top-0 left-0 w-full h-full object-fill"
        />

        <div className="relative flex justify-between gap-x-6 h-[90vh] w-[95%] mx-auto pb-10">
          <div className="flex flex-col justify-between w-[65%] text-[#FCFCFD]">
            <h1 className=" text-[#FCFCFD] font-semibold text-4xl">
              Get started with your{" "}
              <span className="font-bold">Cyber Security</span> Journey today.
            </h1>

            <p className="text-2xl">
              Designed for individuals with little to no prior experience in the
              field, this course provides a solid foundation in cybersecurity
              essentials. Whether you're a curious enthusiast or considering a
              career switch, you'll gain practical knowledge and skills to
              navigate the digital landscape securely.
            </p>

            <div className="w-2/4 bg-[#FFFFFF]/40 backdrop-blur-lg drop-shadow-md px-7 py-4 rounded-md">
              <div className="mb-4 flex justify-between">
                <p className="">
                  Cyber Security{" "}
                  <span>{course?.free ? "(Free)" : course?.price}</span>
                </p>
                <Rating rating={course?.rating || 4.5} />
              </div>
              <div className="flex justify-between">
                <p className="">
                  Rating: <span>{course?.rating}</span>
                </p>
                <p className="">
                  Total Enrolled: <span>{course?.enrolled}</span>
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
