"use client";

import React, { useState } from "react";
import { Mor } from "@/data/Links";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

const More = () => {
  const [heading, setHeading] = useState("");

  return (
    <>
      {Mor.map((link) => (
        <div key={link.name}>
          <div className=" text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 font-semibold text-xl group"
              onClick={() => {
                setHeading(heading !== link.name ? link.name : "");
              }}
            >
              {link.name}
              <span className="text-lg md:mt-1 md:ml-2 inline group-hover:rotate-180 group-hover:">
                <ChevronUp />
              </span>
            </h1>
            {link.submenu && heading === link.name && (
              <div className="lg:absolute lg:top-14 z-30 hidden group-hover:block hover:block ">
                <div className="py-3 mb-2 hidden lg:block">
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45 "></div>
                </div>
                <ul className="bg-white px-5 py-2 rounded-lg shadow-md">
                  {link.sublink.map((slink) => (
                    <li
                      className={`${
                        slink.isComing &&
                        "cursor-not-allowed flex justify-between items-center"
                      } my-2 relative`}
                      key={slink.name}
                      disabled={slink.isComing === true}
                    >
                      <Link
                        href={`${slink.url}`}
                        className="text-sec10"
                        disabled={slink.isComing}
                      >
                        {slink.name}
                      </Link>
                      {slink.isComing && (
                        <p className="text-xs animate-pulse">coming soon</p>
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
