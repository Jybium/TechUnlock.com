import React from "react";
import stats from "@/data/stats";

const StatsCard = () => {
  return (
    <div className="w-4/5 mx-auto bg-white ">
      <div className="flex justify-between items-center py-4">
        {stats.map((stat) => (
          <div
            className={`${stat.id === 2 ? "border-x border-gray-400" : "" } py-10 flex flex-col items-center justify-center md:w-1/3 gap-y-4`}
            key={stat.id}
          >
            <h1 className={`${stat.id === 2 ? "text-first-primary" : "text-primary" } text-4xl font-bold`}>{stat.value}</h1>
            <p className="text-lg text-first-primary">{stat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;
