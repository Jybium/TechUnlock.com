import React from "react";
import angle from "@/assets/about-page/angle.svg";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative about h-screen">
      <div className="">
        <div className="">
          <h1 className="text-4xl font-bold text-white text-center">
            TechUnlock{" "}
            <span className="">the fastest growing tech space for newbies</span>
          </h1>
          <p className="text-white text-center">
            t Duis aute irure dolor in reprehenderit in voluptate velit esse
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
          <Link href="/courses" className="text-center">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
              Start a course
            </button>
          </Link>
        </div>
      </div>
      <Image
        src={angle}
        alt="angle"
        // layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="absolute bottom-0 right-0 w-1/6 h-full"
      />
    </div>
  );
};

export default Banner;
