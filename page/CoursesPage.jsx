"use client";

import React, { useEffect } from "react";
import { useCourses } from "@/Context/courses";
import SearchBar from "@/components/reusables/coursesPage/SearchBar";
import FilterBar from "@/components/reusables/coursesPage/FilterBar";
import { useSearchParams, useRouter } from "next/navigation";
import SelectCourse from "@/components/reusables/coursesPage/Select";
import CourseCard from "@/components/reusables/coursesPage/CourseCard";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";

const CoursesPage = () => {
  const { courses, loading } = useCourses();
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState("");
  const [filteredCourses, setFilteredCourses] = React.useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const featureFilter = searchParams.get("feature") || "all";
  const difficultyFilter = searchParams.get("difficulty") || "all";
  const categoryFilter = searchParams.get("category") || "all";

  useEffect(() => {
    const updatedFilteredCourses = courses?.courses?.filter((course) => {
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
        categoryFilter !== "all" &&
        course.category.toLowerCase() !== categoryFilter.toLowerCase()
      ) {
        return false;
      }
      return true;
    });

    setFilteredCourses(updatedFilteredCourses);
  }, [
    courses,
    featureFilter,
    difficultyFilter,
    search,
    filter,
    categoryFilter,
  ]);

  // Effect to update the URL parameters whenever the filter state changes
  useEffect(() => {
    const params = new URLSearchParams(
      searchParams ? searchParams.toString() : ""
    );
    if (filter) {
      params.set("category", filter);
    } else {
      params.delete("category");
    }
    router.replace(`${window.location.pathname}?${params.toString()}`);
  }, [filter, router, searchParams]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <div className="grid gap-y-4 my-10">
        <SearchBar setData={setSearch} />
        <FilterBar />
        <div className="px-10">
          <SelectCourse setFilter={setFilter} filter={filter} />
        </div>

        {filteredCourses?.length === 0 && (
          <div className="text-center text-lg text-gray-500">
            No courses found.
          </div>
        )}

        <div className="w-[90%] mx-auto grid gap-y-5 mb-5 lg:mb-10">
          {filteredCourses?.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>

        <div className="w-[90%] mx-auto grid gap-y-5 mb-5 lg:mb-10">
          {courses?.enrolled_courses?.map((course) => (
            <CourseCard key={course.id} item={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
