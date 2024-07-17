"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { getCourses } from "@/services/course";

import success from "@/assets/dashboard/profileImage.svg";
import failure from "@/assets/dashboard/failure.webp";
import Image from "next/image";
import { useParams } from "next/navigation";
import { categoryMap } from "./coursesPage/[id]/Banner";
import { Button } from "../ui/button";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";

const BASE_URL = "https://techunlock.pythonanywhere.com";

const Success = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [Courses, setCourses] = React.useState([]);
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fullCategoryName = categoryMap[Courses?.category] || Courses?.category;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        const response = data.filter((item) => item.id === +id);
        setCourses(response[0]);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, [id]);

  useEffect(() => {
    const reference = localStorage.getItem("reference");
    setReference(reference);
  }, []);

  useEffect(() => {
    if (reference.length === 0) {
      router.push("/courses");
    }
  }, [reference]);

  useEffect(() => {
    const verifyPayment = async () => {
      if (reference) {
        try {
          const response = await fetch(
            `${BASE_URL}/payment/verify-payment/${reference}/`
          );

          const data = await response.json();

          if (
            data.message.includes("success") &&
            data.message.includes("verified")
          ) {
            setStatus("success");
            setMessage("Payment Successful!");
          } else if (data.message === "failure") {
            setStatus("failure");
            setMessage("Payment Failed.");
            router.push("/courses");
            showSuccessToast("redirecting to courses page");
          } else if (data.message === "abandoned") {
            setStatus("abandoned");
            setMessage("Payment Abandoned.");
          } else {
            setStatus("error");
            setMessage("An unknown error occurred.");
          }
        } catch (error) {
          setStatus("error");
          setMessage("An error occurred while verifying payment.");
          showErrorToast("An error occurred while verifying payment.");
          setTimeout(() => {
            router.push("/courses");
          }, 3000);
        } finally {
          localStorage.removeItem("reference");
          setLoading(false);
        }
      }
    };

    verifyPayment();
  }, [reference]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="h-4/6 w-4/6 m-auto flex flex-col justify-between">
        <div className="">
          {status === "success" ? (
            <Image src={success} alt="success" className="" />
          ) : (
            <Image
              src={failure}
              alt="failure"
              className="w-60 mx-auto rounded-full"
            />
          )}
        </div>

        <div className="grid gap-y-3 text-center">
          <div className="text-xl text-pri10 font-semibold">{message}</div>
          {status === "success" && (
            <div className="text-2xl text-pri10 font-semibold">
              Congratulations you have successfully registered for a{" "}
              {fullCategoryName} class
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            className="flex items-center justify-center text-white bg-primary shadow-md rounded-md px-4 py-2"
            onClick={() => router.push("/courses")}
          >
            Continue learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Success;
