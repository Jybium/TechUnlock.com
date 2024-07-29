"use client";

import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { removeToken } from "@/helpers/removeToken";
import { useAuth } from "@/Context/auth";
import { useCourses } from "@/Context/courses";

const Page = () => {
  const [course, setCourses] = useState();
  const { courses } = useCourses();
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const id = sessionStorage.getItem("course_id");
    setId(id);
  }, []);

  useEffect(() => {
    const response = courses.filter((item) => item.id === +id);
    setCourses(response[0]);
  }, [id]);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="my-6">
      <div className="w-5/6 md:w-4/6 mx-auto space-y-6">
        <h1 className="text-primary font-semibold text-4xl">
          TechUnlock <span className="text-sec10">course enrollment</span>
        </h1>

        <div className="border-2 border-primary p-6 grid gap-y-6">
          <Image src={logo} alt="Logo" className="" />

          <div className="grid gap-y-4 text-sm">
            <h3 className="">Dear {auth?.first_name},</h3>
            <p className="">
              Thank you for applying for the virtual classes on{" "}
              <span className="text-pri10 font-semibold">{course?.title} </span>
              <span className="text-pri10 font-semibold">
                {course?.difficulty}
              </span>{" "}
              Course!
            </p>
            <div className="space-y-5">
              <p className="">
                Here are information you need to know about the virtual classes
              </p>
              <ul className="list-decimal ml-5 space-y-1">
                <li>Our virtual classes holds three times a week</li>
                <li>The course will last for 8 weeks</li>
                <li>All classes will be held by professionals</li>
                <li>
                  At the end of each classes, assignment or test will be given
                  based on topics learned so far.
                </li>
                <li>
                  Time and date for the classes will be communicated through
                  mail
                </li>
                <li>
                  At the end of the training, certificate for completion will be
                  issued.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            className="flex items-center self-center justify-center text-white bg-primary shadow-md rounded-md px-4 py-2"
            onClick={() => router.push("/courses")}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
