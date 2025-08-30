"use client";

import { getCourses, getEnrolledCourses } from "@/services/course";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEnrolledCourses = useCallback(async () => {
    try {
      const data = await getEnrolledCourses();
      setEnrolledCourses(data.enrolled_courses);
      console.log(data.enrolled_courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
    fetchEnrolledCourses();
  }, [fetchCourses, fetchEnrolledCourses]);

  const contextValue = useMemo(
    () => ({
      courses,
      setCourses,
      enrolledCourses,
      setEnrolledCourses,
      loading,
      setLoading,
    }),
    [courses, enrolledCourses, loading]
  );

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
