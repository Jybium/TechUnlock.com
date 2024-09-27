"use client";

import React, { useState, useEffect } from "react";
import { useCourses } from "@/Context/courses";
import { useAuth } from "@/Context/auth";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import EnrolledCourseCard from "@/components/reusables/profilePage/EnrolledCourseCard";
import { fetchToken } from "@/helpers/getToken";
import axios from "axios";

const ProfilePage = () => {
  const { enrolledCourses } = useCourses();
  const [userDetails, setUserDetails] = useState(null); // Manage user details state
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  useEffect(() => {
    const fetchTokens = async () => {
      const token = await fetchToken();
      if (token) {
        await fetchAccountDetails(token);
      }
      setLoading(false); // Set loading to false after fetching user details
    };

    fetchTokens();
  }, []);

  const fetchAccountDetails = async (token) => {
    try {
      const response = await axios.get(
        "https://techunlock.org/api/account/account-details/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data);
    } catch (error) {
      setError("Failed to load account details. Please try again.");
      if (error.response?.status === 401 || error.response?.status === 400) {
        handleInvalidToken();
      }
    }
  };

  // Show spinner while loading data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error message if any error occurred
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Show the UI once data is available
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
                {userDetails?.first_name}
              </p>
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {userDetails?.last_name}
              </p>
              <p className="text-semibold text-xl text-gray-900 lowercase">
                {userDetails?.email || "-"}
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {userDetails?.phone_number || "-"}
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {userDetails?.gender || "-"}
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {`${userDetails?.home_address || ""} ${
                  userDetails?.state || ""
                } ${userDetails?.country || ""}` || "-"}
              </p>
            </div>
          </div>

          {/* Mobile view */}
          <div className="grid gap-y-5 lg:hidden mt-5">
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">First name:</p>
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {userDetails?.first_name}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">Last name:</p>
              <p className="text-semibold text-xl text-gray-900 capitalize">
                {userDetails?.last_name}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">
                Email address:
              </p>
              <p className="text-semibold text-xl text-gray-900 lowercase">
                {userDetails?.email || "-"}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">Gender:</p>
              <p className="text-semibold text-xl text-gray-900">
                {userDetails?.gender || "-"}
              </p>
            </div>

            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">Location:</p>
              <p className="text-semibold text-xl text-gray-900">
                {`${userDetails?.home_address || ""} ${
                  userDetails?.state || ""
                } ${userDetails?.country || ""}` || "-"}
              </p>
            </div>
            <div className="grid gap-y-2">
              <p className="text-semibold text-xl text-gray-900">
                Phone number:
              </p>
              <p className="text-semibold text-xl text-gray-900">
                {userDetails?.phone_number || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
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
