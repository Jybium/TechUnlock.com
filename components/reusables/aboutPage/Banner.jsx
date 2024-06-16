import React from "react";
import angle from "@/assets/about-page/angle.svg";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative about h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#C0E8F6] to-[#89B3C1] opacity-30"></div>

      <div className="relative h-full w-full flex justify-center items-center z-20">
        <div className="flex flex-col justify-between items-center p-8 rounded-lg max-w-4xl text-justify">
          <h1 className="relative text-6xl font-bold text-primary leading-[1.1] tracking-tight">
            TechUnlock{" "}
            <span className="text-5xl text-pri10 font-semibold">
              the fastest growing tech space for newbies
            </span>
            <span className="absolute w-8 h-8 rounded-full bg-gradient-to-b from-[#101828] to-[#2FB3E3] drop-shadow-2xl inset-0 left-[90%] top-0"></span>
          </h1>
          <p className="text-gray-900 mt-4 text-lg">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/courses">
              <button className="bg-[#2FB3E3] text-white py-2 px-4 rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Start a course
              </button>
            </Link>
          </div>
        </div>

        {/* Floating balls */}
        <span className="absolute w-10 h-10 rounded-full bg-gradient-to-b from-[#101828] to-[#2FB3E3] drop-shadow-2xl left-[11.5%] top-[67%]"></span>
        <span className="absolute w-10 h-10 rounded-full bg-gradient-to-b from-[#101828] to-[#2FB3E3] drop-shadow-2xl left-[86%] top-[55%]"></span>
      </div>

      <div className="absolute bottom-0 right-0 w-1/6 h-[90vh] overflow-hidden z-10">
        <Image
          src={angle}
          alt="Decorative angle"
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
        />
      </div>
    </div>
  );
};

export default Banner;
