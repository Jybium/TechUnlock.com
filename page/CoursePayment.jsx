"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/Context/modal";
import Modal from "@/components/reusables/Modal";
import image from "@/assets/images/logo.svg";
import Link from "next/link";
import Image from "next/image";
import PaymentTypeSelect from "@/components/reusables/modal/PaymentType";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/Context/courses";

const SelectPaymentGuide = () => {
  const { id } = useParams();
  const [Courses, setCourses] = React.useState();
  const { setModal } = useModal();
  const { courses } = useCourses();

  const router = useRouter();

  useEffect(() => {
    const response = courses.filter((item) => item.id === +id);
    setCourses(response[0]);
  }, [id, courses]);

  const handleOpenModal = () => {
    setModal(true);
  };

  return (
    <div className="bg-gray-100  ">
      <nav className="w-full bg-pri1 p-4 px-8 flex items-center rounded-md">
        <Link href="/">
          <div className="md:cursor-pointer z-50 md:w-auto w-full flex items-center">
            <Image src={image} alt="techUnlock logo" className="w-52" />
          </div>
        </Link>
      </nav>

      <main className="py-10 bg-cover bg-[url('@/assets/images/payment-bg.svg')] flex flex-col gap-y-8 w-[90%] mx-auto p-4">
        <div className="flex items-center">
          <p
            onClick={() => window.history.back()}
            className="flex gap-x-2 items-center justify-start text-primary border shadow-md rounded-md bg-amber-50 py-2 px-4 text-sm cursor-pointer"
          >
            <span className="text-primary">←</span> <span>Go Back</span>
          </p>
        </div>

        <div className="grid gap-y-4 max-w-4xl mx-auto">
          <h1 className="text-xl text-center text-pri10 font-semibold ">
            To continue to our enrollment page, kindly make payment for the
            course
          </h1>
          <div className="flex flex-col justify-between gap-y-3 max-w-4xl mx-auto">
            <label className="inline-flex items-center mt-3 space-x-4">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-blue-600 custom-radio"
                checked
                readOnly
              />
              <span>
                For your selected course and level{" "}
                <span className="text-primary">
                  {Courses?.title} {Courses?.difficulty} level
                </span>
                , your payment fee is{" "}
                <span className="text-pri10 font-bold">
                  # {Number(Courses?.price).toFixed(0)}
                </span>
              </span>
            </label>
            <label className="inline-flex items-center mt-3 space-x-4">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-blue-600 custom-radio"
                checked
                readOnly
              />
              <span>
                You are expected to pay before you get enlisted in the training.
              </span>
            </label>
            <label className="inline-flex items-center mt-3 space-x-4">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-blue-600 custom-radio"
                checked
                readOnly
              />
              <span>
                You get access to the courses modules, email notification, and
                constant updates just before the training.
              </span>
            </label>
            <label className="inline-flex items-center mt-3 space-x-4">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-blue-600 custom-radio"
                checked
                readOnly
              />
              <span>This training will be held virtually.</span>
            </label>
            <label className="inline-flex items-center mt-3 space-x-4">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-blue-600 custom-radio"
                checked
                readOnly
              />
              <span>
                Trainers will communicate the time and space for the training
                with you as soon as you make payment
              </span>
            </label>
            <label className="inline-flex items-center mt-3 space-x-4">
              <input
                type="radio"
                className="form-radio h-6 w-6 text-[#561e8f] custom-radio"
                checked
                readOnly
              />
              <span>
                You will receive a confirmation mail after a successful
                transaction.
              </span>
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              className="flex items-center justify-center text-primary bg-amber-50 shadow-md rounded-md"
              onClick={handleOpenModal}
            >
              Select payment method
              <span className="text-primary px-4 py-2 ">&rarr;</span>
            </Button>
          </div>
        </div>
      </main>

      <Modal>
        <PaymentTypeSelect />
      </Modal>
    </div>
  );
};

export default SelectPaymentGuide;
