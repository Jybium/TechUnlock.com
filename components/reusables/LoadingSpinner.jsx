import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"
      role="status"
    ></div>
  </div>
);

export default LoadingSpinner;
