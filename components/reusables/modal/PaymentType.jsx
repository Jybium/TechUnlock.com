"use client";

import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { registerForCourse } from "@/services/course";
import { ArrowRight, X, Copy, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const PaymentTypeSelect = () => {
  const { id } = useParams();
  const [selectedPayment, setSelectedPayment] = useState("Paystack");
  const [loading, setLoading] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const router = useRouter();

  const handlePaymentSelect = (event) => {
    const paymentType = event.target.value;
    setSelectedPayment(paymentType);
  };

  const makePayment = async () => {
    if (selectedPayment === "Bank Transfer") {
      setShowBankTransferModal(true);
      return;
    }
    setLoading(true);

    const formData = new FormData();

    formData.append("course_id", +id);

    try {
      // Make payment using selected payment type
      const response = await registerForCourse(formData);

      if (response === "This is not a paid course.") {
        showErrorToast(response);
        return;
      }

      if (response?.status === true) {
        localStorage.setItem("reference", response?.data?.reference);
        showSuccessToast(
          "Successfully, you are now being redirected to the payment page"
        );
        sessionStorage.setItem("course_id", id);
        // Redirect to payment confirmation page if successful (allowlisted only)
        const url = response?.data?.authorization_url || "";
        const allowlistEnv =
          process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_ALLOWLIST ||
          "https://checkout.paystack.com,https://paystack.com";
        const allowed = allowlistEnv
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (allowed.some((allowedHost) => url.startsWith(allowedHost))) {
          window.location.href = url;
        } else {
          showErrorToast("Unexpected redirect URL. Contact support.");
        }
      } else if (response && response?.message?.includes("already enrolled")) {
        showSuccessToast("You have already enrolled for this course");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error making payment:", error);

      // Show error message to user
      showErrorToast(error || "An error occurred while making payment");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      showSuccessToast(`${fieldName} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      showErrorToast("Failed to copy to clipboard");
    }
  };

  const closeBankTransferModal = () => {
    setShowBankTransferModal(false);
    setCopiedField(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* {loading && <LoadingSpinner/>} */}
      <div className="w-full max-w-md mx-auto grid gap-y-4">
        <h2 className="text-2xl text-center font-bold mb-5">
          Select Payment Type
        </h2>
        <div className="space-y-5">
          {["Paystack", "Bank Transfer"].map((type) => (
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
                className="form-radio h-4 w-4 text-[#13485B] transition duration-150 ease-in-out"
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

      {/* Bank Transfer Modal */}
      {showBankTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Bank Transfer Details
              </h3>
              <button
                onClick={closeBankTransferModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Bank Information */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Bank Account Details
                  </h4>

                  {/* Account Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Account Number
                    </label>
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <span className="font-mono text-gray-900">
                        1234567890
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard("1234567890", "Account Number")
                        }
                        className="text-[#2FB3E3] hover:text-[#2FB3E3]/80 transition-colors"
                      >
                        {copiedField === "Account Number" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Name */}
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Account Name
                    </label>
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <span className="text-gray-900">
                        TechUnlock Learning Platform
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            "TechUnlock Learning Platform",
                            "Account Name"
                          )
                        }
                        className="text-[#2FB3E3] hover:text-[#2FB3E3]/80 transition-colors"
                      >
                        {copiedField === "Account Name" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div className="space-y-2 mt-4">
                    <label className="text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <div className="flex items-center justify-between bg-white p-3 rounded border">
                      <span className="text-gray-900">
                        First Bank of Nigeria
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard("First Bank of Nigeria", "Bank Name")
                        }
                        className="text-[#2FB3E3] hover:text-[#2FB3E3]/80 transition-colors"
                      >
                        {copiedField === "Bank Name" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Instructions
                  </h4>
                  <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                    <li>Copy the account details above</li>
                    <li>Make the transfer to the provided account</li>
                    <li>Use your email as payment reference</li>
                    <li>Send proof of payment to support@techunlock.org</li>
                    <li>Your enrollment will be activated within 24 hours</li>
                  </ol>
                </div>

                {/* Important Notes */}
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">
                    Important Notes
                  </h4>
                  <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                    <li>Ensure you use your email as payment reference</li>
                    <li>Keep your payment receipt for verification</li>
                    <li>
                      Contact support if you don't receive access within 24
                      hours
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <button
                onClick={closeBankTransferModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  copyToClipboard("support@techunlock.org", "Support Email");
                }}
                className="px-4 py-2 bg-[#2FB3E3] text-white rounded hover:bg-[#2FB3E3]/80 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentTypeSelect;
