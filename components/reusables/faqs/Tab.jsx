"use client";

import React, { useState } from "react";
import Accordion from "@/components/reusables/faqs/Accordion";

const TabsComponent = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container md:flex md:justify-between items-start">
      <div className="tabs flex flex-wrap flex-row md:flex-col gap-x-3 gap-y-3 md:w-1/5">
        {data.map((category, index) => (
          <button
            key={index}
            className={`tab px-3 py-2 rounded-md font-semibold ${
              index === activeTab
                ? "bg-primary text-white"
                : "bg-gray-200 text-pri10 border border-primary"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {category.category}
          </button>
        ))}
      </div>
      <div className="tab-content mt-4 md:mt-0 md:w-3/5">
        <Accordion items={data[activeTab].questions} />
      </div>
    </div>
  );
};

export default TabsComponent;
