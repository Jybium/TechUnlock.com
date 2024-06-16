import React from "react";
import AuthLayout from "@/components/reusables/Layout/AuthLayout";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

const page = ({params}) => {

  const Id = params.Id

  return (
    <main className="">
      <AuthLayout
        title="Recover your account"
        message="Don't worry, it happens to all of us."
        action=""
        to=""
      >
        <ResetPasswordForm id={Id} />
      </AuthLayout>
    </main>
  );
};

export default page;
