"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { getCourses } from "@/services/course";
import { useSearchParams } from "next/navigation";
import image from "@/assets/images/logo.svg";

import success from "@/assets/dashboard/profileImage.svg";
import failure from "@/assets/dashboard/failure.webp";
import Image from "next/image";
import { useParams } from "next/navigation";
import { categoryMap } from "./coursesPage/[id]/Banner";
import { Button } from "../ui/button";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import Link from "next/link";

const BASE_URL = "https://techunlock.pythonanywhere.com";

const Success = () => {
  const { id } = useParams();
  const params = useSearchParams();
  const successRef = useRef("");
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
  }, [id, Courses]);

  useEffect(() => {
    const reference = params.get("trxref");
    setReference(reference);
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/payment/verify-payment/${params.get("trxref")}/`
        );

        const data = await response.json();
        console.log(data);
        if (
          data.message.includes("success") ||
          data.message.includes("verified")
        ) {
          successRef.current = data.message;
          setStatus("success");
          setMessage("Payment Successful!");

          setTimeout(() => {
            router.push("/courses/onboarding");
            showSuccessToast("redirecting ...");
          }, 10000);
        } else if (data.message === "failure") {
          setStatus("failure");
          setMessage("Payment Failed.");

          setTimeout(() => {
            router.push("/courses");
            showSuccessToast("redirecting ...");
          }, 10000);
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
        setTimeout(() => {
          router.push("/courses");
          showSuccessToast(
            "An error occurred while verifying payment. \n redirecting ..."
          );
        }, 10000);
      } finally {
        localStorage.removeItem("reference");
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reference]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen">
      <nav className="w-full bg-pri1 p-4 px-8 flex items-center rounded-md ">
        <Link href="/">
          <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center">
            <Image src={image} alt="techUnlock logo" className="w-40 lg:w-52" />
          </div>
        </Link>
      </nav>
      <div className="flex flex-col justify-center items-center h-5/6">
        <div className="h-5/6 w-5/6 m-auto flex flex-col justify-between ">
          <div className="">
            {status === "success" || successRef.current.includes("verified") ? (
              <Image src={success} alt="success" className="mx-auto" />
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
            {reference.length === 0 && (
              <div className="text-2xl text-pri10 font-semibold">
                No reference number found for verification purposes
              </div>
            )}
            {status !== "success" && (
              <div className="text-2xl text-pri10 font-semibold">
                If your account has been debited, please contact our support
                service with clear proof at{" "}
                <Link className="text-primary" passHref legacyBehavior>
                  <a href="mailto:info@techunlock.com">admin@techunlock.com</a>
                </Link>{" "}
                if the reversal does not occur within 24 hours.
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button
              className="flex items-center justify-center text-white bg-primary shadow-md rounded-md px-4 py-2"
              onClick={() =>
                router.push(`${success ? "/courses/onboarding" : "/courses"}`)
              }
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
