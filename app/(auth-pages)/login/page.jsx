import React from "react";
import AuthLayout from "@/components/reusables/Layout/AuthLayout";
import SignInForm from "@/components/forms/SignInForm";

const page = () => {
  return (
    <main className="">
      <AuthLayout
        title="Sign in to your account"
        message="Don't have an account?"
        action="Sign up"
        to="register"
      >
        <SignInForm />
      </AuthLayout>
    </main>
  );
};

export default page;
