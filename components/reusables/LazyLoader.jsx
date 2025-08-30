"use client";

import React, { Suspense, lazy } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Lazy load heavy components
export const LazyCourseCard = lazy(() => import("./coursesPage/CourseCard"));
export const LazyCourseDescription = lazy(() =>
  import("./coursesPage/[id]/Description")
);
export const LazyNotificationDropdown = lazy(() =>
  import("./Layout/components/NotificationDropdown")
);

// Lazy loading wrapper component
const LazyLoader = ({ children, fallback = <LoadingSpinner /> }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default LazyLoader;
