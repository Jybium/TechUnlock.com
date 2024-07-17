"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import formSchema from "@/schema/Signin";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/services/authentication";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";

// Dynamically import LoadingSpinner
const LoadingSpinner = dynamic(
  () => import("@/components/reusables/LoadingSpinner"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    handleOnlineStatus(); // Initial check
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      if (!isOnline) {
        showErrorToast(
          "You are offline. Please check your network connection."
        );
        return;
      }

      try {
        setIsLoading(true);
        const result = await signIn(values);
        showSuccessToast(result.message || "Account login successfully.");
        // On successful login, redirect back to the original page
        if (redirect) {
          router.replace(redirect);
        } else {
          router.push("/courses"); // Default to home page if no redirect is specified
        }
      } catch (error) {
        showErrorToast("check credentials and try again");
      } finally {
        setIsLoading(false);
      }
    },
    [isOnline, router]
  );

  return (
    <div className="">
      {isLoading && <LoadingSpinner />}
      <motion.div
        className="mx-auto max-w-lg lg:max-w-xl shadow-0 drop-shadow-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-none drop-shadow-none rounded-none mx-auto border-0 m-0 p-0">
          <CardContent className="m-0 p-0">
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, staggerChildren: 0.3 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    </motion.div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    </motion.div>
                  )}
                />

                <motion.div
                  className="flex justify-between items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="flex items-center justify-end gap-x-2 text-sm w-full">
                    Forgot password?{" "}
                    <Link
                      href={`/forgot-password`}
                      className="underline text-primary"
                    >
                      Recover account
                    </Link>
                  </p>
                </motion.div>
                <div className="flex flex-col justify-center text-white space-y-6">
                  <Button
                    className="lg:w-1/3 bg-primary text-white flex self-center mt-3"
                    type="submit"
                  >
                    Sign in
                  </Button>

                  <p
                    className="flex gap-x-2 items-center text-primary cursor-pointer"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft size={16} />{" "}
                    <span className="">Back to homepage</span>
                  </p>
                </div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default React.memo(SignInForm);
