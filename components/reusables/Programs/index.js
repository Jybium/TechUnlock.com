"use client";

import React, { useState } from "react";
<<<<<<< HEAD:components/reusables/landingPage/Programs.jsx
import { Prog } from "@/data/Links";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
=======
import { Prog } from "../Links";
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Programs/index.js

const Programs = ({ onclick }) => {
  const [heading, setHeading] = useState("");

  return (
    <>
      {Prog.map((link) => (
        <div key={link.name}>
          <div className="text-left md:cursor-pointer group">
            <h1
<<<<<<< HEAD:components/reusables/landingPage/Programs.jsx
              className="py-7 flex justify-between items-center md:pr-0 pr-5 font-semibold text-lg group"
=======
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Programs/index.js
              onClick={() => {
                setHeading(heading !== link.name ? link.name : "");
              }}
            >
              {link.name}
<<<<<<< HEAD:components/reusables/landingPage/Programs.jsx
              <span className="text-lg md:mt-1 md:ml-2 inline group-hover:rotate-180 group-hover:">
                <ChevronDown />
              </span>
            </h1>
            {link.submenu && heading === link.name && (
              <div className="lg:absolute lg:top-14 z-30 hidden group-hover:block hover:block ">
                <div className="py-3 mb-2 hidden lg:block">
=======
              <span className="text-xl md:mt-1 md:ml-2 inline group-hover:rotate-180 group-hover:-mt-2">
                <i className="bx bx-chevron-up"></i>
              </span>
            </h1>
            {link.submenu && heading === link.name && (
              <div className="absolute top-20 z-20 hidden group-hover:block hover:block">
                <div className="py-3">
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Programs/index.js
                  <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45"></div>
                </div>
                <ul className="bg-white px-5 py-2 rounded-lg shadow-md">
                  {link.sublink.map((slink) => (
<<<<<<< HEAD:components/reusables/landingPage/Programs.jsx
                    <li
                      className={`${
                        slink.isComing &&
                        "cursor-not-allowed flex justify-between items-center gap-x-5"
                      } my-2 relative`}
                      key={slink.name}
                      disabled={slink.isComing}
                      onClick={onclick}
                    >
                      <Link
                        href={slink.isComing ? "#" : slink.url}
                        className={`text-sec10 ${
                          slink.isComing ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        onClick={(e) => slink.isComing && e.preventDefault()}
                        disabled={slink.isComing === true}
                      >
                        {slink.name}
                      </Link>
                      {slink.isComing && (
                        <p className="text-xs animate-pulse">coming soon</p>
                      )}
                    </li>
=======
                    <div className="list-none" key={slink.name}>
                      <li className="text-sec10">{slink.name}</li>
                    </div>
>>>>>>> 7e33099e2438a0958a6a686fd09195b2be827a4f:components/reusables/Programs/index.js
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
