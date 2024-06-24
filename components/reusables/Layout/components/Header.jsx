"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { ChevronDown, ChevronUp } from "lucide-react";

const Header = () => {
  const [data, setData] = useState(null); // Initialize with null for better type consistency
  const [profileOpen, setProfileOpen] = useState(false); // Initialize with false for clarity

  const handleDropDown = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <div className="fixed w-full md:w-4/5 bg-pri1 pr-8">
      <div className="flex justify-between w-full">
        <div className="w-3/5 flex justify-end items-center ml-auto">
          <SearchBar setData={setData} />
        </div>

        <div className="flex items-center gap-x-3 w-2/5">
          <div className="relative flex items-center gap-x-3 w-3/5 ml-auto">
            <span className="h-10 w-10 p-3 text-lg text-pri1 font-semibold bg-darkblue rounded-full flex items-center justify-center">
              G
            </span>

            <div
              className="relative cursor-pointer w-full"
              onClick={handleDropDown}
            >
              <div className="flex items-center justify-between bg-white rounded-md border border-pri1 w-full p-3 shadow-md text-sm">
                <p className="font-semibold text-[#344054]">Welcome, Guest</p>
                {profileOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-full bg-white border rounded-md text-sm shadow-md z-10">
                  {/* Dropdown content here */}
                  <p className="py-2 pl-4">Profile</p>
                  <p className="py-2 pl-4">Settings</p>
                  <p className="py-2 pl-4">Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
