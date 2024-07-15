"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/reusables/LoadingSpinner";
import { signUp } from "@/services/authentication";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import courseRegistrationSchema from "@/schema/courseRegistration";
import { course } from "@/data/courses";

import "./style.css";

const RegisterCourseForm = () => {
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
    resolver: zodResolver(courseRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countryCode: "",
      gender: "",
      course: "",
      agreeTerms: false,
      confirmInfo: false,
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
        const result = await signUp(values);
        showSuccessToast(result.message || "Account created successfully.");
        router.push("/dashboard");
      } catch (error) {
        showErrorToast(error.message || "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [isOnline, router]
  );

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      {isLoading && <LoadingSpinner />}
      <motion.div
        className="w-full max-w-lg lg:max-w-xl shadow-0 drop-shadow-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-none drop-shadow-none rounded-none mx-auto border-0 m-0 p-0 bg-transparent">
          <CardContent className="m-0 p-0 bg-transparent">
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, staggerChildren: 0.3 }}
              >
                <div className="grid gap-3 grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your first name"
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
                    name="lastName"
                    render={({ field }) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter your last name"
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
                    name="email"
                    render={({ field }) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
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

                  <div className="flex items-center">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormItem className="">
                            <FormLabel className="whitespace-nowrap">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <SelectTrigger className="rounded-r-none">
                                  <SelectValue placeholder="+234" />
                                </SelectTrigger>
                                <SelectContent className="min-w-[8rem]">
                                  <SelectItem value="+1">+1 (USA)</SelectItem>
                                  <SelectItem value="+44">+44 (UK)</SelectItem>
                                  <SelectItem value="+234">
                                    +234 (NG)
                                  </SelectItem>
                                  {/* Add more country codes as needed */}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        </motion.div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FormItem className="w-full">
                            <FormLabel className="opacity-0">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                className="rounded-l-none"
                                placeholder="Enter your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        </motion.div>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      </motion.div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose course" />
                              </SelectTrigger>
                              <SelectContent>
                                {course.map((course) => (
                                  <SelectItem key={course.id} value={course.id}>
                                    {course.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      </motion.div>
                    )}
                  />
                </div>

                <div className="grid gap-y-1">
                  <p className="text-error">
                    *Requirements that would boost your learning speed and
                    knowledge
                  </p>

                  <ul className="list-disc text-pri1 ml-5">
                    <li>Good power supply</li>
                    <li>A functional computer</li>{" "}
                    <li>Stable internet connection</li>
                  </ul>
                </div>
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormItem>
                        <div className="flex items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="ml-2">
                            I agree to the{" "}
                            <span className="text-primary font-medium">
                              terms and conditions
                            </span>
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    </motion.div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmInfo"
                  render={({ field }) => (
                    <motion.div
                      className="flex items-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FormItem>
                        <div className="flex items-center">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="ml-2">
                            I confirm that the information provided is true
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    </motion.div>
                  )}
                />

                <div className="flex flex-col items-center text-white">
                  <Button
                    className="w-full lg:w-1/3 bg-primary text-white mt-3"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </motion.form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterCourseForm;
