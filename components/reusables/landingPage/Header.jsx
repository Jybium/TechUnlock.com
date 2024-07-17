/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import image from "@/assets/landing-page/headerImage.png";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full header-img bg-cover bg-center flex justify-around text-pri1 relative lg:h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2FB3E3] via-[#1A637D]/55 to-[#1A637D] opacity-30 -z"></div>
      <div className="grid gap-y-8 lg:gap-y-0 lg:flex lg:justify-between w-[90%] mx-auto my-6 lg:my-3 items-center header-content">
        <section className="flex flex-col justify-center z-10 gap-7 lg:w-[45%]">
          <h1 className="text-[2rem] lg:text-[4rem] font-[600] text-[#EAF7FC] leading-[1.2]">
            Switch your Tech skill<span> on</span>
          </h1>
          <div className="text-[#EAF7FC] text-lg">
            <p>
              Start your journey to learning highly sought after tech skills for
              FREE.
            </p>
            <p>
              Find and connect with friends who are on the same learning journey
              as you.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/courses">
              <button className="px-6 py-2 rounded-xl bg-white text-sec10 font-medium header-button">
                Start Learning
              </button>
            </Link>
            {/* <button className="px-6 py-2 rounded-xl border-pri1 border-[1px] text-white bg-transparent font-medium header-button">
              Learn at your pace
            </button> */}
          </div>
        </section>
        <section className="z-10 lg:w-[55%]">
          <Image
            src={image}
            alt="header image"
            className="w-[90%] ml-auto header-image"
          />
        </section>
      </div>
    </header>
  );
};

export default Header;
