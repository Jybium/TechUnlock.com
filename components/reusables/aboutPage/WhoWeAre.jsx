import React from "react";

const WhoWeAre = () => {
  return (
    <div className="whoweare max-h-full bg-white">
      <div className="w-[90%] lg:w-3/5 mx-auto">
        <div className="text-center grid gap-y-10 mt-10">
          <div className="grid gap-y-3 text-center">
            <h1 className="font-bold text-xl lg:text-2xl text-pri10">
              Our Vision
            </h1>
            <p className="text-center text-lg lg:text-xl">
              Our Vision is to build Africa’s leading tech innovation ecosystem
            </p>
          </div>
          <div className="grid gap-y-3 text-center">
            <h1 className="font-bold text-xl lg:text-2xl text-pri10">
              Our Mission
            </h1>
            <p className="text-center text-lg lg:text-xl">
              Our mission is to multiply skilled tech talents in Africa by
              bridging the skill gap through relevant skill acquisition and
              development.
            </p>
          </div>
          <div className="grid gap-y-3 text-center">
            <h1 className="font-bold text-xl lg:text-2xl text-pri10">
              Core Values
            </h1>
            <p className="text-center text-lg lg:text-xl">
              We value: Innovation, Learning, Collaboration, Enterprise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
