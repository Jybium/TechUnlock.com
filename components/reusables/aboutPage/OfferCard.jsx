import React from "react";

const OfferCard = ({ item }) => {
  return (
    <div className="bg-pri10 py-[1.44rem] px-[2.20rem] grid gap-y-4 text-primary rounded shadow">
      <span className="h-10 w-10 rounded-full bg-white font-bold flex items-center justify-center text-lg">
        {item.id}
      </span>
      <h4 className="font-semibold text-xl">{item.title}</h4>
      <p className="text-white text-justify">{item.description}</p>
    </div>
  );
};

export default OfferCard;
