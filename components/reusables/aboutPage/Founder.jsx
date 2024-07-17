import React from "react";
import Image from "next/image";
import founder from "@/assets/about-page/founder.svg";

const Founder = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col-reverse lg:flex-row gap-y-5 lg:gap-y-0 lg:justify-between items-center w-[90%] mx-auto mb-[3rem] lg:mb-[6rem] mt-[3rem]">
        <div className="lg:w-3/5">
          <h3 className="text-gray-900 font-semibold text-3xl">
            Meet the Founder of <span className="text-primary">TechUnlock</span>
          </h3>
          <p className="mt-[2.70rem] text-lg font-thin">
            A visionary leader multiplying skilled Tech Talents in Africa.
          </p>
          <p className="mt-[1rem] lg:mt-[2rem] text-lg font-thin">
            David is the Fo-Founder and Project Leader at TechUnlock Nigeria. He
            has led over 400 projects at various scales to successful
            completion. He currently is an Innovation Project lead, implementing
            the digital skill training and development program in partnership
            with The Federal Ministry of Education - IDEAS and The World Bank.
          </p>
          <p className="mt-2 flex justify-end text-pri10 font-semibold text-xl">
            David
          </p>
        </div>

        <div className="lg:w-[30%] w-full">
          <Image
            src={founder}
            alt="founder"
            width={400}
            height={400}
            className="lg:w-[75%] w-[95%] mx-auto lg:ml-auto h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default Founder;
