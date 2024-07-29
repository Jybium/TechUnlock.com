"use client";

import React, { useEffect } from "react";
import { useCourses } from "@/Context/courses";
import { useParams } from "next/navigation";
import Banner from "@/components/reusables/coursesPage/[id]/Banner";
import Description from "@/components/reusables/coursesPage/[id]/Description";
import Curriculum from "@/components/reusables/coursesPage/[id]/Curriculum";
import CourseAddOn from "@/components/reusables/coursesPage/[id]/CourseAddOn";
import FeedbackContainer from "@/components/reusables/coursesPage/[id]/FeedbackContainer";
import PromotionBanner from "@/components/reusables/coursesPage/[id]/PromotionBanner";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";

const SpecificCoursePage = () => {
  const { id } = useParams();
  const { courses, loading } = useCourses();
  const [Courses, setCourses] = React.useState([]);

  useEffect(() => {
    const response = courses.filter((item) => item.id === +id);

    setCourses(response);
  }, [id, courses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <Banner course={Courses[0]} />
      <Description course={Courses[0]} />
      <Curriculum course={Courses[0]} />
      <CourseAddOn course={Courses[0]} />
      <FeedbackContainer course={Courses[0]} />
      <PromotionBanner course={Courses[0]} />
    </div>
  );
};

export default SpecificCoursePage;
