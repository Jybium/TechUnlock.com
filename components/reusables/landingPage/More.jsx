"use client";

import React, { useState } from "react";
import { Mor } from "@/data/Links";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const More = ({ onclick }) => {
  const [heading, setHeading] = useState("");

  return (
    <>
      {Mor.map((link) => (
        <div key={link.name} className="relative">
          <div className="text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 font-semibold text-lg group"
              onClick={() => {
                setHeading(heading !== link.name ? link.name : "");
              }}
            >
              {link.name}
              <span className="text-lg md:mt-1 md:ml-2 inline transition-transform duration-200 ease-in-out transform group-hover:rotate-180">
                <ChevronDown />
              </span>
            </h1>

            {/* Submenu for larger screens */}
            {link.submenu && (
              <div className="lg:absolute lg:top-16 z-30 hidden lg:group-hover:block">
                {/* <div className="py-3 mb-2 hidden lg:block">
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                </div> */}
                <ul className="bg-white px-5 py-2 rounded-lg shadow-md w-full whitespace-nowrap">
                  {link.sublink.map((slink) => (
                    <li
                      className={`${
                        slink.isComing &&
                        "cursor-not-allowed flex gap-x-5 justify-between items-center"
                      } my-2 relative`}
                      key={slink.name}
                      disabled={slink.isComing === true}
                      onClick={onclick}
                    >
                      <Link
                        href={slink.isComing ? "#" : slink.url}
                        className={`text-sec10 ${
                          slink.isComing ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        onClick={(e) => slink.isComing && e.preventDefault()}
                      >
                        {slink.name}
                      </Link>
                      {slink.isComing && (
                        <p className="text-xs md:text-[10px] animate-pulse">
                          coming soon
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Submenu for mobile view */}
            {link.submenu && heading === link.name && (
              <div className="lg:hidden">
                <ul className="bg-white px-5 py-2 rounded-lg shadow-md">
                  {link.sublink.map((slink) => (
                    <li
                      className={`${
                        slink.isComing &&
                        "cursor-not-allowed flex gap-x-5 justify-between items-center"
                      } my-2 relative`}
                      key={slink.name}
                      disabled={slink.isComing === true}
                      onClick={onclick}
                    >
                      <Link
                        href={slink.isComing ? "#" : slink.url}
                        className={`text-sec10 ${
                          slink.isComing ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        onClick={(e) => slink.isComing && e.preventDefault()}
                      >
                        {slink.name}
                      </Link>
                      {slink.isComing && (
                        <p className="text-xs md:text-[10px] animate-pulse">
                          coming soon
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default More;
