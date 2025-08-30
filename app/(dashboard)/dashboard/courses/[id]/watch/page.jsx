"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getCourseDetails } from "@/services/course";

const CourseDetailsPage = dynamic(
  () => import("@/page/dashboard/course-details"),
  { ssr: false }
);

export default function DashboardCourseWatchRoute() {
  const params = useParams();
  const router = useRouter();
  const search = useSearchParams();
  const { id } = params || {};
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const isPreview = search?.get("preview") === "1";

  useEffect(() => {
    let cancelled = false;
    async function checkEnrollment() {
      try {
        const data = await getCourseDetails(id);
        if (cancelled) return;
        const enrolled = Boolean(
          data?.is_enrolled ?? data?.is_enrollled ?? data?.enrolled
        );
        setIsEnrolled(enrolled);
        if (!enrolled) {
          router.replace(`/dashboard/courses/${id}?enroll_required=1`);
        }
      } catch (e) {
        router.replace(`/dashboard/courses/${id}`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (isPreview) {
      setIsEnrolled(true);
      setLoading(false);
      return;
    }
    if (id) checkEnrollment();
    return () => {
      cancelled = true;
    };
  }, [id, router, isPreview]);

  if (loading) return null;
  if (!isEnrolled) return null;

  return <CourseDetailsPage courseId={id} />;
}
