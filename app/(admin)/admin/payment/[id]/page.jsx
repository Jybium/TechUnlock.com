"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentDetailsPage = ({ params }) => {
  const router = useRouter();

  // Mock data for payment details
  const paymentDetails = {
    transactionId: "123456789090011",
    paymentMethod: "Paystack (Card)",
    paymentStatus: "Success",
    date: "22/09/2024",
    amount: "#50,000",
    courseTitle: "Digital Marketing(Intermediate)",
    learner: {
      firstName: "hamed",
      lastName: "buba",
      email: "hamedbuba@gmail.com",
      phone: "0900008000",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Payment Details</h1>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Summary Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Transaction Summary
            </h3>
            <span className="text-green-600 font-medium">
              {paymentDetails.paymentStatus}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                Transaction ID
              </span>
              <span className="text-sm text-gray-900 font-mono">
                {paymentDetails.transactionId}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                Payment method
              </span>
              <span className="text-sm text-gray-900">
                {paymentDetails.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                Payment status
              </span>
              <span className="text-sm text-green-600 font-medium">
                {paymentDetails.paymentStatus}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Date</span>
              <span className="text-sm text-gray-900">
                {paymentDetails.date}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Amount</span>
              <span className="text-sm text-gray-900 font-semibold">
                {paymentDetails.amount}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">
                Course title
              </span>
              <span className="text-sm text-gray-900">
                {paymentDetails.courseTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Learner Information Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Learner Information
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                First name
              </span>
              <span className="text-sm text-gray-900">
                {paymentDetails.learner.firstName}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">
                Last name
              </span>
              <span className="text-sm text-gray-900">
                {paymentDetails.learner.lastName}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Email</span>
              <span className="text-sm text-gray-900">
                {paymentDetails.learner.email}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-600">Phone</span>
              <span className="text-sm text-gray-900">
                {paymentDetails.learner.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;

