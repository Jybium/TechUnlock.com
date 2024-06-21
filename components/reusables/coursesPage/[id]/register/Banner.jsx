import React from "react";
import Image from "next/image";
import { BannerCard } from "./BannerCard";

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
              Learn at your <span className="font-bold text-primary">Pace</span>{" "}
              for all our courses.
            </h1>

            <p className="text-2xl">
              t Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="mt-4 absolute bottom-5 right-0 z-20 w-[30%] ml-auto">
            <BannerCard courses={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
