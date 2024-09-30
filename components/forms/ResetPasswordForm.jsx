/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";

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
import formSchema from "@/schema/Reset";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { resetPassword } from "@/services/authentication";

export default function ResetPasswordForm({ id }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

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
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values) => {
    const data = { ...values, user_id: id };

    if (!isOnline) {
      showErrorToast("You are offline. Please check your network connection.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await resetPassword(data);
  

      showSuccessToast(result.message || "Password reset successfully.");

      router.push("/login");
    } catch (error) {
      showErrorToast(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {isLoading && <LoadingSpinner />}
      <motion.div
        className="mx-auto lg:mx-0 max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-none drop-shadow-none rounded-none mx-auto space-y-3 border-0 m-0 p-0">
          <CardContent className="shadow-none drop-shadow-none rounded-none mx-auto space-y-1 border-0 m-0 p-0">
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, staggerChildren: 0.3 }}
              >
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
                        <FormLabel>Enter new paswword</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password"
                              {...field}
                            />
                            <span
                              className="absolute right-3 bottom-2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <Eye /> : <EyeOff />}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    </motion.div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormItem>
                        <FormLabel>Confirm paswword</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              {...field}
                            />
                            <span
                              className="absolute right-3 bottom-2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <Eye /> : <EyeOff />}
                            </span>
                          </div>
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
                    Confirm
                  </Button>

                  <p
                    className="flex gap-x-2 items-center text-primary"
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
}
