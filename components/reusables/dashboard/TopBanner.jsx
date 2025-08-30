import React from "react";
import Image from "next/image";

import profileImage from "@/assets/dashboard/profileImage.svg";
import Link from "next/link";
import { useAuth } from "@/Context/auth";

const TopBanner = () => {
  const { auth } = useAuth();
  const firstName = auth?.first_name || auth?.user?.first_name || "";
  const lastName = auth?.last_name || auth?.user?.last_name || "";
  return (
    <div className="bg-white rounded w-full">
      {/* TOP BANNER BODY */}
      <div className="flex items-center gap-x-4 w-[97%] ml-auto">
        <div className="">
          <Image
            src={profileImage}
            alt="Profile image"
            className="w-20 h-20 hover:scale-110 hover:delay-100 transition-all ease-in-out"
          />
        </div>

        <div className="text-sec10 font-bold space-y-5">
          <p>
            Good to have you here{firstName || lastName ? ", " : ""}
            {firstName} {lastName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
