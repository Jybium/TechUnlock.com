"use client";

import React from "react";
import Image from "next/image";
import Accordion from "@/components/reusables/Accordion";
import line from "@/assets/landing-page/Line.svg";
import {
  CertificateIcon,
  LevelIcon,
  ModuleIcon,
  TimeIcon,
} from "@/components/svgs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Overview = ({ course }) => {
  const router = useRouter();
  return (
    <div className="w-full bg-white py-[2rem] px-[3rem]">
      <div className="grid gap-y-4">
        <div className="flex items-end justify-between w-1/2">
          <h3 className="text-pri10 font-semibold text-2xl">{course?.title}</h3>
          <p className=" border border-pri10 rounded p-1 text-xs w-fit whitespace-nowrap">
            Training fee: #{course?.price}
          </p>
        </div>

        <div className="flex justify-between gap-y-4 w-full mt-5">
          {/* Course overview */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between">
            <div className="">
              <div className="grid gap-2 text-darkblue font-semibold">
                <p className="flex items-center gap-x-3">
                  <TimeIcon />{" "}
                  <span className="">
                    Time and Duration: {course?.duration}
                  </span>
                </p>
                <p className="flex items-center gap-x-3">
                  <LevelIcon />{" "}
                  <span className="">Training level: {course?.difficulty}</span>
                </p>
                <p className="flex items-center gap-x-3">
                  <ModuleIcon />{" "}
                  <span className="">Module: {course?.number_of_modules}</span>
                </p>
                <p className="flex items-center gap-x-3">
                  <CertificateIcon />{" "}
                  <span className="">
                    {course?.is_certificate && "Certificate of completion"}
                  </span>
                </p>
              </div>
              <div className="mt-4">
                <h4 className="text-pri10 font-semibold text-lg">
                  Skills you will learn
                </h4>
                <div className="flex flex-wrap gap-3 text-xs mt-2">
                  {course?.course_skills.map((item) => (
                    <span className="border border-primary py-1 px-2 rounded text-primary font-medium">
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                className="bg-primary text-white"
                onClick={() => router.push(`/courses/${course?.id}/register`)}
              >
                Apply now
              </Button>
            </div>
          </div>

          {/* Curriculum */}
          <div className="w-full lg:w-[50%] grid gap-y-5 shadow-md p-4 rounded">
            <div className="relative">
              <p className="relative grid">
                <Image
                  src={line}
                  alt="line"
                  className="absolute left-0 top-7 w-[30%] mx-auto"
                />
                <span className="text-2xl font-semibold text-first-primary">
                  Curriculum
                </span>
              </p>
            </div>

            <div className="">
              <Accordion items={course?.modules} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
