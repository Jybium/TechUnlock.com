"use client"


import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {UseRouter} from "next/navigation"
import { ArrowRight } from "lucide-react";

const RecentlyEnrolledCourseCard = ({
  id,
  imageSrc,
  title,
  description,
  currentModule,
  progressPercentage,
  completedLessons,
  totalLessons,
}) => {
  // const progressPercentage = (completedLessons / totalLessons) * 100;
  const router = useRouter()

  return (
    <div className="max-w-sm rounded-md overflow-hidden bg-white shadow flex flex-col justify-between">
      <div>
        <Image
          className="w-full h-28 object-cover"
          src={imageSrc}
          width={500}
          height={200}
          alt="card Image"
        />
      </div>
      <div className="px-6 py-4 flex-grow">
        <div className="font-bold text-first-primary text-sm mb-2">{title}</div>
        <p className="text-gray-900 text-sm">{description}</p>
      </div>

      <div className="space-y-3 px-6 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="font-semibold text-primary">
            Module: {completedLessons + 1}
          </div>
          <div className="text-sm text-darkblue font-semibold">
            {completedLessons}/{totalLessons}{" "}
            <span className="text-primary font-semibold text-sm">Lessons</span>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="w-[90%] bg-gray-200 rounded-full h-2">
            <div
              className="bg-pri10 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="flex items-center text-primary justify-center text-sm font-semibold">
            {progressPercentage.toFixed(0)} <span>%</span>
          </span>
        </div>
      </div>
      <div className="mb-2 flex justify-end" onClick={()=> router.push(`/dashboard/courses/${id}/watch`)}>
        <Button className="py-2 text-primary bg-transparent flex items-center gap-x-4">
          Continue learning <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default RecentlyEnrolledCourseCard;
