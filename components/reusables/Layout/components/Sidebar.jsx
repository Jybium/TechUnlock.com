import React from "react";
import Logo from "./Logo";
import { CloseIcon, SettingIcon } from "@/components/svgs";
import Navigation from "./Navigation";

const Sidebar = () => {
  return (
    <div className="w-1/5 h-full bg-sec10 flex items-center text-pri1">
      <div className="w-5/6 mx-auto h-5/6 flex flex-col justify-between">
        <div className="grid gap-y-10">
          {/* the logo part */}
          <div className="flex items-center justify-between w-full">
            <Logo />
            <button className="">
              <CloseIcon className="w-full" />
            </button>
          </div>

          {/* Navlink */}
          <div className="w-5/6 mx-auto">
            <Navigation />
          </div>
        </div>

        {/* far end bottom link */}
        <div className="flex items-center justify-center border border-darkblue w-5/6 mx-auto rounded-md p-3 mb-4 ">
          <SettingIcon />
          <p className="ml-3">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
