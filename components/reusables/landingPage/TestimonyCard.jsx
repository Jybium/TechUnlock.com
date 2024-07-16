import React from "react";
import Image from "next/image";

const TestimonyCard = ({ data }) => {
  return (
    <div className="relative w-full bg-pri1 pt-16 pb-5 px-6">
      <div className="bg-white rounded-full absolute -top-1/3 left-[45%] shadow-md">
        <Image
          src={data.image}
          alt="testimony"
          width={160}
          height={160}
          className="w-24 h-24 mx-auto rounded-full"
        />
      </div>

      <div className="grid gap-y-8 text-center text-2xl">
        <p className="text-sm text-first-primary italic">{data.testimony}</p>
        <p className="text-sm text-first-primary font-bold uppercase">
          {data.name} - <span className="capitalize">{data.position}</span>
        </p>
      </div>
    </div>
  );
};

export default TestimonyCard;
