"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { fetchToken } from "@/helpers/getToken";
import { showErrorToast } from "@/helpers/toastUtil";
import axios from "axios";
import { useRouter } from "next/navigation";
import { removeToken } from "@/helpers/removeToken";

const DashboardLayout = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null); // Manage user details state
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  const router = useRouter();

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

  const handleInvalidToken = () => {
    // Remove token and redirect to login if pathname matches
    if (
      pathname.includes("pay") ||
      pathname.includes("register") ||
      pathname.includes("verify")
    ) {
      removeToken().then(() => {
        router.push("/login");
      });
    } else {
      // Optionally, handle other cases if needed
      removeToken();
    }
  };

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

  if (userDetails && !userDetails.is_admin_user) {
    showErrorToast("Unauthorized route.");
    router.push("/");
  }

  return (
    <div className="relative h-screen w-full">
      <div className="flex items-start h-full w-full">
        <Sidebar />
        <div className="w-4/5 ml-auto bg-[#FCFCFD]">
          <Header />

          <div className="relative p-5 w-full h-[calc(100vh-80px)] top-20 bg-[#FCFCFD] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
