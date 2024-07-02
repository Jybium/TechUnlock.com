"use client";

import React from "react";
import Rating from "../landingPage/Rating";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import {
  CertificateIcon,
  LevelIcon,
  ModuleIcon,
  TimeIcon,
} from "@/components/svgs";
import Image from "next/image";

const CourseCard = ({ item }) => {
  const router = useRouter();

  return (
    <div className="bg-pri1 rounded-md shadow-md drop-shadow-sm">
      <div className="bg-pri1 grid gap-x-3 items-center p-2 w-full rounded-md">
        <div className="">
          <Image
            src={item?.thumbnail}
            alt={item?.title}
            className="w-full h-full rounded-md "
            // layout="fill"
          />
        </div>

        <div className=" grid gap-y-3 p-3">
          <h1 className="text-xl text-[#2FB3E3] font-semibold">{item?.name}</h1>
          <div className="text-[#1C6B88]">
            <p className="line-clamp-2 font-semibold">{item?.description}</p>
          </div>

          <p className="flex gap-x-3 font-semibold items-center text-[#1C6B88]">
            <span>{item?.rating}.0</span> <Rating rating={5} />
          </p>

          <div className="grid grid-cols-1 gap-3 text-darkblue font-semibold">
            <p className="flex items-center gap-x-3">
              <TimeIcon />{" "}
              <span className="">Duration: {item.details.duration}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <LevelIcon />{" "}
              <span className="">Training level: {item.details.level}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <ModuleIcon />{" "}
              <span className="">Module: {item.details.module}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <CertificateIcon />{" "}
              <span className="">
                {item.details.certificate && "Certificate of completion"}
              </span>
            </p>
          </div>

          <div className="flex justify-center mt-3">
            <Button
              className="bg-primary text-white"
              onClick={() => router.push(`${item.slug}`)}
            >
              Start learning
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
