"use client";

import React from "react";
import dynamic from "next/dynamic";
const AddCourseForm = dynamic(
  () => import("@/components/forms/AddCourseForm"),
  { ssr: false }
);
// import LoadingSpinner from "@/components/reusables/LoadingSpinner";
// import { fetchToken } from "@/helpers/getToken";
// import { showErrorToast } from "@/helpers/toastUtil";
// import axios from "axios";
// import { useRouter } from "next/navigation";

const AddCourse = () => {
  // const [userDetails, setUserDetails] = useState(null); // Manage user details state
  // const [loading, setLoading] = useState(true); // Manage loading state
  // const [error, setError] = useState(null); // Manage error state

  // const router = useRouter();

  // useEffect(() => {
  //   const fetchTokens = async () => {
  //     const token = await fetchToken();
  //     if (token) {
  //       await fetchAccountDetails(token);
  //     }
  //     setLoading(false); // Set loading to false after fetching user details
  //   };

  //   fetchTokens();
  // }, []);

  // const fetchAccountDetails = async (token) => {
  //   try {
  //     const response = await axios.get(
  //       "https://techunlock.org/api/account/account-details/",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setUserDetails(response.data);
  //   } catch (error) {
  //     setError("Failed to load account details. Please try again.");
  //     if (error.response?.status === 401 || error.response?.status === 400) {
  //       handleInvalidToken();
  //     }
  //   }
  // };

  // // Show spinner while loading data
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  // // Show error message if any error occurred
  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       <p className="text-red-500">{error}</p>
  //     </div>
  //   );
  // }

  // if (userDetails && !userDetails.is_admin_user) {
  //   showErrorToast("Unauthorized route.");
  //   router.push("/");
  // }

  return (
    <div className="">
      <AddCourseForm />
    </div>
  );
};

export default AddCourse;
