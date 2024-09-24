"use client";

import React from "react";
import { useCourses } from "@/Context/courses";
import { useAuth } from "@/Context/auth";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import EnrolledCourseCard from "@/components/reusables/profilePage/EnrolledCourseCard";

const ProfilePage = () => {
  const { enrolledCourses } = useCourses();
  const { auth, loading } = useAuth();



  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto">
      <div className="grid gap-y-8">
        <div className="">
          <p className="text-pri10 font-semibold text-2xl">Your profile</p>

          <div className="hidden lg:flex gap-x-10 mt-5 w-5/6 lg:w-1/2">
            <div className="flex flex-col gap-y-4">
              <p className="text-semibold text-xl text-gray-900">First name:</p>
              <p className="text-semibold text-xl text-gray-900">Last name:</p>
              <p className="text-semibold text-xl text-gray-900">
                Email address:
              </p>
              <p className="text-semibold text-xl text-gray-900">
                Phone number:
              </p>
              <p className="text-semibold text-xl text-gray-900">Gender:</p>
              <p className="text-semibold text-xl text-gray-900">Location:</p>
            </div>

            <div className="flex flex-col gap-y-4 ml-auto">
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {auth?.first_name}
              </p>
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {auth?.last_name}
              </p>
              <p className="text-semibold text-xl text-gray-900 lowercase">
                {auth?.email || "-"}
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {auth?.phone_number || "-"}
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {auth?.gender || "-"}
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {`${auth?.home_address || ""} ${auth?.state || ""} ${
                  auth?.country
                }` || "-"}
              </p>
            </div>
          </div>

          <div className="grid gap-y-5 lg:hidden mt-5">
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">First name:</p>
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {auth?.first_name}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">Last name:</p>
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {auth?.last_name}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">
                Email address:
              </p>
              <p className="text-semibold text-xl text-gray-900 lowercase">
                {auth?.email || "-"}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">Gender:</p>
              <p className="text-semibold text-xl text-gray-900">
                {auth?.gender || "-"}
              </p>
            </div>

            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">Location:</p>
              <p className="text-semibold text-xl text-gray-900">
                {`${auth?.home_address || ""} ${auth?.state || ""} ${
                  auth?.country
                }` || "-"}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">
                Phone number:
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {auth?.phone_number || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-9">
          <div className="flex items-center gap-x-5">
            <p className="text-pri10 font-semibold text-2xl">
              Courses enrolled
            </p>
            <span className="font-bold">{enrolledCourses?.length}</span>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {enrolledCourses?.map((course) => (
              <EnrolledCourseCard key={course.id} item={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
