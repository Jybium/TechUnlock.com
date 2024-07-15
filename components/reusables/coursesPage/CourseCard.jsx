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
    <div className="bg-pri1 rounded-md shadow-md">
      <div className="bg-pri1 grid lg:flex gap-x-3 items-center p-2 w-full rounded-md">
        <div className="w-1/3">
          <Image
            src={item?.cover_image || ""}
            alt={item?.title}
            className="w-full h-full rounded-md "
            // layout="fill"
          />
        </div>

        <div className="pl-3 w-2/3 grid gap-y-6 py-2">
          <div className="flex justify-between items-center w-[90%]">
            <h1 className="text-3xl text-darkblue font-semibold">
              {item?.title}
            </h1>
            <Rating rating={5} />
          </div>
          <div className="text-gray-900">
            <p className="">{item?.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-darkblue font-semibold">
            <p className="flex items-center gap-x-3">
              <TimeIcon /> <span className="">Duration: {item?.duration}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <LevelIcon />{" "}
              <span className="">Training level: {item?.difficulty}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <ModuleIcon />{" "}
              <span className="">Module: {item?.number_of_modules}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <CertificateIcon />{" "}
              <span className="">
                {item?.is_certificate && "Certificate of completion"}
              </span>
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-primary text-white"
              onClick={() => router.push(`${item?.id}`)}
            >
              More training details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
