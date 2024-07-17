import React from "react";
import angle from "@/assets/about-page/angle.svg";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative about lg:h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#C0E8F6] to-[#89B3C1] opacity-30"></div>

      <div className="relative h-full w-full flex justify-center items-center z-20">
        <div className="flex flex-col justify-between items-center p-8 rounded-lg max-w-3xl lg:text-justify">
          <h1 className="relative text-5xl lg:text-6xl font-bold text-primary lg:leading-[1.05] tracking-tight">
            TechUnlock{" "}
            <span className="text-3xl lg:text-5xl text-pri10 font-semibold">
              the fastest growing tech space for newbies
            </span>
            <span className="absolute w-8 h-8 rounded-full bg-gradient-to-b from-[#101828] to-[#2FB3E3] drop-shadow-2xl inset-0 left-[89%] -top-3"></span>
          </h1>
          <p className="text-gray-900 mt-6 text-lg">
            With over 4000 trainees and a fast growing tech community,
            TechUnlock Nigeria is positioned to give you the advantage you need
            in your tech career. We believe that training is beyond the detailed
            course work or the most relevant curriculum. Training is holistic
            and the community you choose to grow with, determines your direction
            and growth.
          </p>
          <p className="text-gray-900 mt-4 text-lg">
            We go beyond the expected training, we develop you to take on real
            time projects and build your portfolio and we prepare you for the
            job market or entrepreneurship.
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
        <span className="absolute hidden lg:block w-10 h-10 rounded-full bg-gradient-to-b from-[#101828] to-[#2FB3E3] drop-shadow-2xl left-[11.5%] top-[67%]"></span>
        <span className="absolute hidden lg:block w-10 h-10 rounded-full bg-gradient-to-b from-[#101828] to-[#2FB3E3] drop-shadow-2xl left-[86%] top-[55%]"></span>
      </div>

      <div className="absolute hidden lg:block bottom-0 right-0 w-1/6 h-[90vh] overflow-hidden z-10">
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
