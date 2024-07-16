"use client";

import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { registerForCourse } from "@/services/course";
import { ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const PaymentTypeSelect = () => {
  const { id } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("Bank Transfer");
  const [loading, setLoading] = useState(false);

  const handlePaymentSelect = (event) => {
    const paymentType = event.target.value;
    setSelectedPayment(paymentType);
  };

  const makePayment = async () => {
    if (selectedPayment === "Bank Transfer") {
      return;
    }
    setLoading(true);

    const formData = new FormData();

    formData.append("course_id", +id);

    try {
      // Make payment using selected payment type
      const response = await registerForCourse(formData);
      if (response?.status === true) {
        localStorage.setItem("reference", response?.data?.reference);
        showSuccessToast(
          "Successfully, you are now being redirected to the payment page"
        );
        // Redirect to payment confirmation page if successful
        window.location.href = response?.data?.authorization_url;
      }
    } catch (error) {
      console.error("Error making payment:", error);
      // Show error message to user
      showErrorToast("An error occurred while making payment");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    // {loading && <LoadingSpinner/>}
    <div className="w-full max-w-md mx-auto grid gap-y-4">
      <h2 className="text-2xl text-center font-bold mb-5">
        Select Payment Type
      </h2>
      <div className="space-y-5">
        {["Bank Transfer", "Paystack"].map((type) => (
          <div
            key={type}
            className="flex items-center rounded shadow px-4 py-2 w-full cursor-pointer"
          >
            <input
              id={type}
              type="radio"
              name="paymentType"
              value={type}
              checked={selectedPayment === type}
              onChange={handlePaymentSelect}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <div className="w-full">
              <div className="flex justify-between items-start w-full">
                <label
                  htmlFor={type}
                  className="ml-5 block text-gray-800 font-semibold"
                >
                  {type}
                </label>
                {type === "Bank Transfer" ? (
                  <p className=" bg-white text-sm text-gray-800 font-semibold animate-pulse w-fit">
                    coming soon
                  </p>
                ) : (
                  <p className=" bg-white text-sm text-green-500 ">
                    Recommended
                  </p>
                )}
              </div>
              <p className="ml-5 text-sm">
                {type === "Bank Transfer"
                  ? "Make payment directly to our bank"
                  : "Make payment using our third party account"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p
        className={`${
          selectedPayment === "Bank Transfer"
            ? "cursor-not-allowed"
            : "cursor-pointer"
        } flex items-center justify-center gap-x-4 rounded text-center  text-primary mt-4`}
        onClick={() => makePayment()}
        disabled={selectedPayment === "Bank Transfer"}
      >
        Continue to payment{" "}
        <span className="">
          <ArrowRight />
        </span>
      </p>
    </div>
  );
};

export default PaymentTypeSelect;
