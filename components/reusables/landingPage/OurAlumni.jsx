import React from "react";
import Image from "next/image";

import work from "@/assets/landing-page/Where our trainees work.jpg";

const OurAlumni = () => {
  return (
    <div className="mt-8 lg:mt-14">
      <div className="relative">
        <p className="relative grid justify-center content-center">
          <span className="text-center lg:text-3xl font-semibold text-first-primary">
            Where our trainees work
          </span>
        </p>
      </div>
      <div className="mt-8 w-[95%] mx-auto">
        <Image
          src={work}
          alt="companies where our trainees work"
          className="mx-auto object-contain"
        />
      </div>
    </div>
  );
};

export default OurAlumni;
