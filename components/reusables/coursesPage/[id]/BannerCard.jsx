"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// images

// UI/UX
import UICard from "@/assets/course-page/UICard.svg";

// web development
import webDev from "@/assets/course-page/webDevCard.svg";

// cybersecurity
import cyberSec from "@/assets/course-page/cybersecurityCard.svg";

// DM
import DMCard from "@/assets/course-page/DMCard.svg";

// AI
import AI from "@/assets/course-page/AICard.svg";

export const BannerCard = ({ courses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("onsite");
  const router = useRouter();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === ["dm", "ai", "web"].length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? ["dm", "ai", "web"].length - 1 : prevIndex - 1
    );
  };

  const handleChange = (value) => {
    setSelectedOption(value);
  };

  const getLabelClass = (value) => {
    return selectedOption === value ? "text-gray-800" : "text-white";
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-[#FFFFFF]/20 rounded-md drop-shadow-lg backdrop-blur-lg px-3 py-2 border border-gray-900">
      <div className="relative h-52">
        {["dm", "ai", "web"]?.map((course, index) => (
          <div
            key={index}
            className={cn("absolute inset-0 transition-opacity duration-1000", {
              "opacity-0": index !== currentIndex,
              "opacity-100": index === currentIndex,
            })}
          >
            <Image
              src={
                course.category === "UI/UX"
                  ? UICard
                  : course.category === "WEB"
                  ? webDev
                  : course.category === "CYBER"
                  ? cyberSec
                  : course.category === "DM"
                  ? DMCard
                  : AI
              }
              alt={course.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className=" flex justify-center px-2 py-2 bg-sec10 w-1/4 mx-auto rounded-xl my-2">
        {["dm", "ai", "web"]?.map((course, index) => (
          <button
            key={index}
            className={cn("h-2 w-2 rounded-full mx-1 transition-colors", {
              "bg-white": index !== currentIndex,
              "bg-blue-500": index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Radio group */}
      <div className="mt-3 px-3">
        <RadioGroup
          defaultValue="onsite"
          className="grid gap-y-3"
          onValueChange={handleChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pace" id="pace" />
            <Label htmlFor="pace" className={getLabelClass("pace")}>
              Learn at your pace
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="onsite" id="onsite" />
            <Label htmlFor="onsite" className={getLabelClass("onsite")}>
              Physical classes are available
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="real-project" id="real-project" />
            <Label
              htmlFor="real-project"
              className={getLabelClass("real-project")}
            >
              Work on real life projects
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4 px-4 pb-5">
        <Button onClick={() => router.push(`/courses/${courses.id}/register`)}>
          Apply Now
        </Button>
        <Button variant="outline">Save for Later</Button>
      </div>
    </div>
  );
};
