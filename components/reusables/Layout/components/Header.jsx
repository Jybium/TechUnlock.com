"use client";

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/Context/auth";
import Link from "next/link";
import { removeToken } from "@/helpers/removeToken";
import { useRouter } from "next/navigation";

const Header = () => {
  const [data, setData] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { auth } = useAuth();
  const router = useRouter();

  const handleDropDown = () => {
    setProfileOpen(!profileOpen);
  };

  const firstName = auth?.first_name || auth?.user?.first_name || "Guest";
  const lastName = auth?.last_name || auth?.user?.last_name || "";
  const initials = `${(firstName || "G").charAt(0)}${(lastName || "").charAt(
    0
  )}`.toUpperCase();
  const fullName = `${firstName}${lastName ? ` ${lastName}` : ""}`;

  const logout = async () => {
    await removeToken();
    router.push("/login");
  };

  return (
    <div className="fixed w-full md:w-4/5 bg-pri1 pr-8 z-20">
      <div className="flex justify-between w-full">
        <div className="w-3/5 flex justify-end items-center ml-auto">
          <SearchBar setData={setData} />
        </div>

        <div className="flex items-center gap-x-3 w-2/5">
          <div className="relative flex items-center gap-x-3 w-3/5 ml-auto">
            <span className="h-10 w-10 p-2 text-lg text-pri1 font-semibold bg-[#268FB6] rounded-full flex items-center justify-center">
              {initials}
            </span>

            <div
              className="relative cursor-pointer w-full"
              onClick={handleDropDown}
            >
              <div className="flex items-center justify-between bg-white rounded-md border border-pri1 w-full p-3 shadow-md text-sm">
                <p className="font-semibold w-full line-clamp-1 text-ellipsis text-[#344054]">
                  Welcome, {fullName}
                </p>
                {profileOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-full bg-white border rounded-md text-sm shadow-md z-10">
                  <Link
                    href="/profile"
                    className="block py-2 pl-4 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block py-2 pl-4 hover:bg-gray-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left py-2 pl-4 hover:bg-gray-50"
                  >
                    Logout
                  </button>
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
