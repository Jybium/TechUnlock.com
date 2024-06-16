"use client";

import React, { useState } from "react";
import { Prog } from "@/data/Links";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

const Programs = () => {
  const [heading, setHeading] = useState("");

  return (
    <>
      {Prog.map((link) => (
        <div key={link.name}>
          <div className="px-3 text-left md:cursor-pointer group">
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
              <div className="absolute top-14 z-30 hidden group-hover:block hover:block ">
                <div className="py-3">
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                </div>
                <ul className="bg-white px-5 py-2 rounded-lg shadow-md">
                  {link.sublink.map((slink) => (
                    <li className="my-2" key={slink.name}>
                      <Link href={`${slink.url}`} className="text-sec10">
                        {slink.name}
                      </Link>
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

export default Programs;
