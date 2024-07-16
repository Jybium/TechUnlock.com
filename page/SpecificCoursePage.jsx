"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { getCourses } from "@/services/course";
import Banner from "@/components/reusables/coursesPage/[id]/Banner";
import Description from "@/components/reusables/coursesPage/[id]/Description";
import Curriculum from "@/components/reusables/coursesPage/[id]/Curriculum";
import CourseAddOn from "@/components/reusables/coursesPage/[id]/CourseAddOn";
import FeedbackContainer from "@/components/reusables/coursesPage/[id]/FeedbackContainer";
import PromotionBanner from "@/components/reusables/coursesPage/[id]/PromotionBanner";

const SpecificCoursePage = () => {
  const { id } = useParams();
  const [Courses, setCourses] = React.useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data.filter((item) => item.id === +id));
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, [id]);

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
