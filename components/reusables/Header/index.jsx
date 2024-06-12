/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import image from "@/assets/headerImage.png";

const Header = () => {
  return (
    <header className="w-full header-img bg-cover bg-center flex justify-around text-pri1 relative h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2FB3E3] via-[#1A637D]/55 to-[#1A637D] opacity-30 -z"></div>
      <div className="flex justify-between w-[90%] mx-auto my-3 items-center header-content">
        <section className="flex flex-col justify-center z-10 gap-7 w-[45%]">
          <h1 className="text-[4.5rem] font-[600] text-[#EAF7FC]">
            Switch your Tech skill<span> on</span>
          </h1>
          <div className="text-[#EAF7FC]">
            <p>
              Start your journey to learning highly sought after tech skills for
              FREE.
            </p>
            <p>
              Find and connect with friends who are on the same learning journey
              as you.
            </p>
          </div>
          <div className="md:flex items-center gap-5 hidden">
            <button className="px-6 py-2 rounded-xl bg-white text-sec10 font-medium header-button">
              Start Learning
            </button>
            <button className="px-6 py-2 rounded-xl border-pri1 border-[1px] text-white bg-transparent font-medium header-button">
              Learn at your pace
            </button>
          </div>
        </section>
        <section className="z-10 w-[55%]">
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
