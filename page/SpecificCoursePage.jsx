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
  const [Courses, setCourses] = React.useState();

  useEffect(() => {
    const response = courses.filter((item) => item.id === +id);
    setCourses(response[0]);
  }, [id, courses]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <Banner course={Courses} />
      <Description course={Courses} />
      <Curriculum course={Courses} />
      <CourseAddOn course={Courses} />
      <FeedbackContainer course={Courses} />
      <PromotionBanner course={Courses} />
    </div>
  );
};

export default SpecificCoursePage;
