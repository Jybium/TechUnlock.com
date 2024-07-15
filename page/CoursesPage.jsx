"use client";

import React, { useEffect } from "react";
import SearchBar from "@/components/reusables/coursesPage/SearchBar";
import FilterBar from "@/components/reusables/coursesPage/FilterBar";
import { useRouter, useSearchParams } from "next/navigation";
import SelectCourse from "@/components/reusables/coursesPage/Select";
import CourseCard from "@/components/reusables/coursesPage/CourseCard";
import { getCourses } from "@/services/course";

const CoursesPage = () => {
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [courses, setCourses] = React.useState([]);
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const searchParams = useSearchParams();

  const featureFilter = searchParams.get("feature") || "all";
  const difficultyFilter = searchParams.get("difficulty") || "all";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) => {
      if (featureFilter !== "all" && course.category !== featureFilter) {
        return false;
      }
      if (
        difficultyFilter !== "all" &&
        course.difficulty !== difficultyFilter
      ) {
        return false;
      }
      if (
        search &&
        !course.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (
        filter &&
        !course.category.toLowerCase().includes(filter.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
    setFilteredCourses(filtered);
  }, [courses, featureFilter, difficultyFilter, search]);

  return (
    <div className="">
      <div className="grid gap-y-4 my-10">
        <SearchBar setData={setSearch} />
        <FilterBar />
        <div className="px-10">
          <SelectCourse setFilter={setFilter} filter={filter} />
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center text-lg text-gray-500">
            No courses found.
          </div>
        )}

        <div className="w-[90%] mx-auto grid gap-y-5 mb-10">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
