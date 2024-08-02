"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Banner from "@/components/reusables/coursesPage/[id]/Banner";
import Description from "@/components/reusables/coursesPage/[id]/Description";
import Curriculum from "@/components/reusables/coursesPage/[id]/Curriculum";
import CourseAddOn from "@/components/reusables/coursesPage/[id]/CourseAddOn";
import FeedbackContainer from "@/components/reusables/coursesPage/[id]/FeedbackContainer";
import PromotionBanner from "@/components/reusables/coursesPage/[id]/PromotionBanner";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { getCourses } from "@/services/course";

const SpecificCoursePage = () => {
  const { id } = useParams();
  const [Courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        const response = data.filter((item) => item.id === +id);
        setCourses(response[0]);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [id]);

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
