import Image from "next/image";
import React from "react";
import overlay from "@/assets/about-page/overlay.svg";

const TestimonialCard = ({ item }) => {
  return (
    <div className="mx-2" key={item.id}>
      <div className="lg:flex lg:justify-between items-center w-full relative">
        <div className="grid gap-y-4 lg:w-3/5">
          <p className="text-[#82D1EE] font-semibold text-4xl w-[57%] leading-[0.7]">
            {item.number}{" "}
            <span className="text-white text-xl">{item.value}</span>
          </p>
          <p className="text-white text-lg">{item.message}</p>
          <p className="text-[#82D1EE] text-lg font-semibold">
            {item.name}, <span className="">{item.profession}</span>
          </p>
        </div>

        <div className="relative lg:w-2/5">
          <Image
            src={item.image}
            alt="author image"
            width={100}
            height={100}
            className="relative ml-auto z-10 w-[70%] object-cover"
          />
          <Image
            src={overlay}
            alt="overlay"
            className="absolute top-0 left-1/3 w-[60%] ml-auto h-full object-contain opacity-70 z-20"
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
