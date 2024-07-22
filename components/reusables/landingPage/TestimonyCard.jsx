import React from "react";
import Image from "next/image";

const TestimonyCard = ({ data }) => {
  return (
    <div className="relative z-20 w-full grid gap-y-4 bg-pri1 pt-5 lg:pt-16  lg:pb-5 lg:px-6">
      <div className="bg-white w-fit mx-auto rounded-full lg:absolute lg:-top-1/3 lg:left-[45%] shadow-md z-20">
        <Image
          src={data.image}
          alt="testimony"
          width={160}
          height={160}
          className="w-24 h-24 mx-auto rounded-full"
        />
      </div>

      <div className="grid gap-y-8 text-center text-2xl w-[90%] mx-auto">
        <p className="text-sm text-first-primary italic line-clamp-3 lg:line-clamp-none">
          {data.testimony}
        </p>
        <p className="text-sm text-first-primary font-bold uppercase">
          {data.name} - <span className="capitalize">{data.position}</span>
        </p>
      </div>
    </div>
  );
};

export default TestimonyCard;
