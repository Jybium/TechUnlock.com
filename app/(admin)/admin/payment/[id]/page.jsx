"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { getPaymentDetails } from "@/services/admin";
import { showErrorToast } from "@/helpers/toastUtil";

const PaymentDetailsPage = ({ params }) => {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState({
    transactionId: "",
    paymentMethod: "",
    paymentStatus: "",
    date: "",
    amount: "",
    courseTitle: "",
    learner: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch payment details on component mount
  useEffect(() => {
    fetchPaymentDetails();
  }, [params.id]);

  const fetchPaymentDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getPaymentDetails(params.id);

      // Transform the API response to match our UI structure
      setPaymentDetails({
        transactionId: response.transaction_id || response.id || "",
        paymentMethod: response.payment_method || "Unknown",
        paymentStatus: response.status || "Pending",
        date: response.created_at
          ? new Date(response.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          : "",
        amount: `₦${response.amount?.toLocaleString() || "0"}`,
        courseTitle: response.course?.title || "Unknown Course",
        learner: {
          firstName: response.user?.first_name || "",
          lastName: response.user?.last_name || "",
          email: response.user?.email || "",
          phone: response.user?.phone || response.user?.phone_number || "",
        },
      });
    } catch (error) {
      console.error("Error fetching payment details:", error);
      showErrorToast("Failed to load payment details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500">Loading payment details...</p>
        </div>
      </div>
    );
  }

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
