import React from "react";
import Image from "next/image";
import founder from "@/assets/about-page/founder.svg";

const Founder = () => {
  return (
    <div className="w-full h-full">
      <div className="flex justify-between w-5/6 mx-auto">
        <div className="w-2/3">
          <h3 className="">
            Meet the Founder of <span className="">TechUnlock</span>
          </h3>
          <p className="">
            t Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p className="">David</p>
        </div>

        <div className="w-1/3">
          <Image
            src={founder}
            alt="founder"
            width={400}
            height={400}
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default Founder;
