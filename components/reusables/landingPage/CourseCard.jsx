import React from "react";
import Link from "next/link";
import Image from "next/image";
import Rating from "./Rating";

const CourseCard = ({ course }) => {
  const { thumbnail, title, rating, description, slug } = course;

  return (
    <div className="w-full h-[34rem] rounded-md overflow-hidden shadow-lg bg-pri1 flex flex-col">
      <div className="h-52 w-full relative rounded-md object-cover overflow-hidden">
        <Image
          className="object-cover rounded-md pt-3 overflow-hidden"
          src={thumbnail}
          alt={title}
          layout="fill"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="font-semibold text-xl mb-2 flex justify-between items-center">
          {title}
          <span className="inline-block rounded-full font-semibold text-gray-700">
           <Rating rating={rating}/>
          </span>
        </div>
        <div className="flex-grow overflow-auto mt-3">
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="flex justify-center mt-4">
          <Link href={`/courses/${slug}`}>
            <button className="bg-primary hover:bg-blue-700 text-pri1 py-2 px-4 rounded">
              View training schedule
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
