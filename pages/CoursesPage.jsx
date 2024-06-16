"use client";

import React from "react";
import SearchBar from "@/components/reusables/coursesPage/SearchBar";
import FilterBar from "@/components/reusables/coursesPage/FilterBar";
import { useRouter, useSearchParams } from "next/navigation";
import SelectCourse from "@/components/reusables/coursesPage/Select";
import { course } from "@/data/courses";
import courseOffered from "@/data/coursesOffered";
import CourseCard from "@/components/reusables/coursesPage/CourseCard";

const CoursesPage = () => {
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const featureFilter = searchParams.get("feature") || "all";
  const difficultyFilter = searchParams.get("difficulty") || "all";

  //   API CALL TO GET COURSES
  //   const filteredCourses = getFilteredCourses(featureFilter, difficultyFilter);

  return (
    <div className="">
      <div className="grid gap-y-10 mt-20">
        <SearchBar setData={setSearch} />
        <FilterBar />
        <div className="px-10">
          <SelectCourse courses={course} />
        </div>

        <div className="w-[90%] mx-auto grid gap-y-5 min-h-screen mb-20">
          {courseOffered.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
