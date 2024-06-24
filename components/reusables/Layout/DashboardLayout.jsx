import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <div className="flex items-start h-full w-full">
        <Sidebar />
        <div className="relative w-4/5 ml-auto bg-[#FCFCFD]">
          <Header />

          <div className="relative p-4 w-full top-20 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
