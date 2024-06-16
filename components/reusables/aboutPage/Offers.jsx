import React from "react";
import offers from "@/data/offers";
import OfferCard from "./OfferCard";

const Offers = () => {
  return (
    <div className="relative bg-white z-20">
      <div className="w-[95%] mx-auto my-[5rem]">
        <span className="">
          <p className="text-pri10 text-4xl font-semibold">
            Journey with us at{" "}
            <span className="text-6xl text-primary">TechUnlock </span> <br />
            as we provide you with
          </p>
        </span>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 w-[95%] mx-auto mt-[3rem]">
          {offers.map((item) => (
            <div
              key={item.id}
              className="flex justify-center w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)]"
            >
              <OfferCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
