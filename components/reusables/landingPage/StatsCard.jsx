"use client";

import React, { useEffect, useState } from "react";
import stats from "@/data/stats";
import OnScrollView from "../Layout/OnScrollView";

const StatsCard = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = Math.ceil(stat.value / 100); // Adjust increment based on your needs
      return setInterval(() => {
        setCounts((prevCounts) => {
          const newCounts = [...prevCounts];
          if (newCounts[index] + increment >= stat.value) {
            newCounts[index] = stat.value;
            clearInterval(intervals[index]);
          } else {
            newCounts[index] += increment;
          }
          return newCounts;
        });
      }, 100); // Adjust the interval time based on your needs
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div className="lg:w-4/5 mx-auto bg-white">
      <OnScrollView>
        <div className="flex justify-between items-center py-4">
          {stats.map((stat, index) => (
            <div
              className={`${
                stat.id === 2 ? "border-x border-gray-400" : ""
              } text-center lg:text-left px-4 py-3 lg:px-0 lg:py-10 flex flex-col items-center justify-center md:w-1/3 gap-y-2 lg:gap-y-4`}
              key={stat.id}
            >
              <h1
                className={`${
                  stat.id === 2 ? "text-first-primary" : "text-primary"
                } text-2xl lg:text-4xl font-bold`}
              >
                {counts[index]}
                {stat.id === 1 ? "+" : "%"}
              </h1>
              <p className="text-sm lg:text-lg text-first-primary">
                {stat.name}
              </p>
            </div>
          ))}
        </div>
      </OnScrollView>
    </div>
  );
};

export default StatsCard;
