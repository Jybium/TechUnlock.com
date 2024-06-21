import React from "react";
import Image from "next/image";

const Description = () => {
  return (
    <div className="relative mt-[6.44rem] mb-[5rem]">
      <div className="flex justify-between w-full bg-pri1 py-[2.75rem] px-[5.6rem]">
        <div className="w-[47%]">
          <div className="w-[90%] ml-auto">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="w-[45%]">
          <Image
            src="/images/placeholder.jpg"
            alt="course image"
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
