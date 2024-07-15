"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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
import formSchema from "@/schema/Forgot";
import { ArrowLeft } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { forgotPassword } from "@/services/authentication";

// Dynamically import LoadingSpinner
const LoadingSpinner = dynamic(
  () => import("@/components/reusables/LoadingSpinner"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

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
        const result = await forgotPassword(values);
        showSuccessToast(
          result.message || "Please check your email for further instructions"
        );

        setTimeout(() => {
          router.push("/success");
        }, 3000);
      } catch (error) {
        showErrorToast(error.message || "An error occurred. Please try again.");
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
        className="mx-auto max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-none drop-shadow-none rounded-none mx-auto space-y-1 border-0 m-0 p-0">
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
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </motion.div>
                  )}
                />

                <div className="flex flex-col justify-center text-white space-y-6">
                  <Button
                    className="lg:w-1/3 bg-primary text-white flex self-center mt-3"
                    type="submit"
                  >
                    Submit
                  </Button>

                  <p
                    className="flex gap-x-2 items-center text-primary cursor-pointer"
                    onClick={() => router.back()}
                  >
                    <ArrowLeft size={16} /> <span className="">Go back</span>
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

export default React.memo(ForgotPasswordForm);
