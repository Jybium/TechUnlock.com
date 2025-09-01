/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import image from "@/assets/landing-page/pace-hero.svg";
import Link from "next/link";

const HeroSection = () => {
  return (
    <header className="w-full header-im bg-cover bg-center flex justify-around text-pri1 relative py-10">
      <div className="absolute inset-0 bg-[#EAF7FC] opacity-30 -z "></div>
      <div className="grid gap-y-8 lg:gap-y-0 lg:flex lg:justify-between w-[90%] mx-auto my-6 lg:my-3 lg:mb- items-center header-content">
        <section className="flex flex-col justify-center z-10 gap-7 lg:w-[60%]">
          <h1 className="text-[2rem] lg:text-[4rem] font-[600] text-[#13485B] leading-[1.2]">
            Start Learning In-Demand Tech Skill - For Free
          </h1>
          <div className="text-[#082C39] text-lg">
            <p>
              Self-paced beginner courses with training badges. 100% free. No
              tech experience needed.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/dashboard">
              <button className="px-6 py-3    rounded-xl bg-primary text-white font-medium header-button">
                Start Learning
              </button>
            </Link>
            {/* <button className="px-6 py-2 rounded-xl border-pri1 border-[1px] text-white bg-transparent font-medium header-button">
              Learn at your pace
            </button> */}
          </div>
        </section>
        <section className="z-10 lg:w-[40%]">
          <Image
            src={image}
            alt="header image"
            className=" ml-auto header-image"
          />
        </section>
      </div>
    </header>
  );
};

export default HeroSection;
