import React from "react";
import AuthLayout from "@/components/reusables/Layout/AuthLayout";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

const page = () => {
  return (
    <main className="">
      <AuthLayout
        title="Recover your account"
        message="Don't worry, it happens to all of us."
        action=""
        to=""
      >
        <ForgotPasswordForm />
      </AuthLayout>
    </main>
  );
};

export default page;
