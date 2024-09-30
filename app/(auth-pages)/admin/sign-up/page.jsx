import React from "react";
import AuthLayout from "@/components/reusables/Layout/AuthLayout";
import AdminSignUpForm from "@/components/forms/AdminSignUp";

const page = () => {
  return (
    <main className="">
      <AuthLayout
        title="Create your account"
        message="Already have an account?"
        action="Sign in"
        to="login"
      >
        <AdminSignUpForm />
      </AuthLayout>
    </main>
  );
};

export default page;
