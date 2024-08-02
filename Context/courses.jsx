"use client";

import { getCourses, getEnrolledCourses } from "@/services/course";
import React, { createContext, useContext, useEffect, useState } from "react";

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const data = await getEnrolledCourses();
        setEnrolledCourses(data.enrolled_courses);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const contextValue = {
    courses,
    setCourses,
    enrolledCourses,
    setEnrolledCourses,
    loading,
    setLoading,
  };

  return (
    <CoursesContext.Provider value={contextValue}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }
  return context;
};
