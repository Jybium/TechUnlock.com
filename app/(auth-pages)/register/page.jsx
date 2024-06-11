import React from 'react'
import AuthLayout from '@/components/reusables/Layout/AuthLayout'
import SignUpForm from '@/components/forms/SignUpForm'

const page = () => {
  return (
    <main className="">
      <AuthLayout
        title="Create your account"
        message="Already have an account?"
        action="Sign in"
        to="sign-in"
      >
        <SignUpForm />
      </AuthLayout>
    </main>
  );
}

export default page