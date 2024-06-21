import React from "react";
import Image from "next/image";
import DynamicCard from "./DynamicCurriculum";

const Curriculum = () => {
  return (
    <div className="relative mx-[4rem]">
      <div className="w-full bg-pri1 py-[2.75rem] px-[4rem]">
        <DynamicCard />
      </div>
    </div>
  );
};

export default Curriculum;
