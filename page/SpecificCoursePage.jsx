"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Banner from "@/components/reusables/coursesPage/[id]/Banner";
import Description from "@/components/reusables/coursesPage/[id]/Description";
import Curriculum from "@/components/reusables/coursesPage/[id]/Curriculum";
import CourseAddOn from "@/components/reusables/coursesPage/[id]/CourseAddOn";
import FeedbackContainer from "@/components/reusables/coursesPage/[id]/FeedbackContainer";
import PromotionBanner from "@/components/reusables/coursesPage/[id]/PromotionBanner";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { useCourses } from "@/Context/courses";

const SpecificCoursePage = () => {
  const { id } = useParams();
  const { courses, loading } = useCourses();
  const [course, setCourse] = useState(null);

  const fetchCourse = () => {
    try {
      const allCourses = [
        ...(courses?.courses || []),
        ...(courses?.enrolled_courses || []),
      ];
      const foundCourse = allCourses.find((item) => item.id === parseInt(id)); // find the course by ID
      setCourse(foundCourse);
    } catch (error) {
      console.error("Error fetching course:", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id, courses]);

  if (loading || !course) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <Banner course={course} />
      <Description course={course} />
      <Curriculum course={course} />
      <CourseAddOn course={course} />
      <FeedbackContainer course={course} />
      <PromotionBanner course={course} />
    </div>
  );
};

export default SpecificCoursePage;
