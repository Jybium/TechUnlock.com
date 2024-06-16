import React from "react";
import Image from "next/image";
import founder from "@/assets/about-page/founder.svg";

const Founder = () => {
  return (
    <div className="w-full h-full">
      <div className="lg:flex lg:justify-between items-center w-[90%] mx-auto mb-[7.5rem] mt-[3rem]">
        <div className="lg:w-3/5">
          <h3 className="text-gray-900 font-semibold text-4xl">
            Meet the Founder of <span className="text-primary">TechUnlock</span>
          </h3>
          <p className="mt-[2.70rem] text-2xl font-thin">
            t Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p className="mt-2 flex justify-end text-darkblue font-semibold text-2xl">
            David
          </p>
        </div>

        <div className="lg:w-[30%]">
          <Image
            src={founder}
            alt="founder"
            width={400}
            height={400}
            className="w-[75%] h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default Founder;
