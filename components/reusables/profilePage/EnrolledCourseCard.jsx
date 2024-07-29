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

const EnrolledCourseCard = ({ item }) => {
  const router = useRouter();

  return (
    <div className="bg-pri1 rounded-md shadow-md">
      <div className="bg-pri1 w-fit p-2 rounded-md">
        <div className="">
          <Image
            src={
              item?.cover_image.includes("path-to-image")
                ? ""
                : item?.cover_image || ""
            }
            alt={item?.title}
            className="w-full h-full rounded-md object-cover"
            width={300}
            height={300}
            // layout="fill"
          />
        </div>

        <div className="pl-3 grid lg:gap-y-6 gap-y-3 py-2">
          <div className="flex justify-between items-center w-[90%] text-sm">
            <h1 className=" text-darkblue font-semibold text-base">
              {item?.title}
            </h1>
            Training fee: #{Number(item?.price).toFixed(0)}
          </div>
          <div className="text-gray-900">
            <p className="line-clamp-2 text-sm">{item?.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 text-darkblue font-semibold">
            <p className="flex items-center gap-x-3">
              <TimeIcon /> <span className="">Duration: {item?.duration}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <LevelIcon />{" "}
              <span className="">Training level: {item?.difficulty}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <ModuleIcon />{" "}
              <span className="">Instructor: {item?.instructor || "-"}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <CertificateIcon />{" "}
              <span className="">
                {item?.is_certificate && "Certificate of completion"}
              </span>
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              className="bg-primary text-white"
              onClick={() => router.push(`/courses/${item?.id}`)}
            >
              Course overview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
