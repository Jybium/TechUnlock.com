import React from "react";

const MethodCards = ({ item }) => {
  return (
    <div className="bg-pri1 w-full rounded-md">
      <div className="p-6 grid gap-y-16 text-darkblue w-full">
        <span className="rounded-lg bg-primary flex items-center justify-center h-12 w-12">
          {item.icon}
        </span>

        <div className="grid gap-y-5">
          <div className="grid gap-y-2">
            <p className="text-2xl font-semibold">{item.title}</p>
            <p className="text-lg">{item.description}</p>
          </div>
          <p className="text-primary">{item.action}</p>
        </div>
      </div>
    </div>
  );
};

export default MethodCards;
