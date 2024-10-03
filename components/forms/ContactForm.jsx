"use client";

import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/schema/Contact";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import LoadingSpinner from "../reusables/LoadingSpinner";

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
      terms: false,
    },
  });

  const onSubmit = useCallback(
    async (values) => {
      try {
        setIsLoading(true);
        // Submit form values
        // const result = await submitContactForm(values);
        showSuccessToast("Message sent successfully.");
        form.reset();
      } catch (error) {
        showErrorToast(error.message || "An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [form]
  );

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <motion.div
        className="mx-aut w-full max-w-lg lg:max-w-full shadow-0 drop-shadow-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-none drop-shadow-none rounded-none mx-auto border-0 m-0 p-0">
          <CardContent>
            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, staggerChildren: 0.3 }}
              >
                <div className="lg:flex lg:justify-between lg:items-center lg:gap-x-6 space-y-4 lg:space-y-0">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full"
                            placeholder="first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full"
                            placeholder="last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="leading-none text-ash">
                          You agree to our friendly{" "}
                          <a href="/terms" className=" underline">
                            privacy policy.
                          </a>
                        </FormLabel>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center w-full">
                  <Button
                    type="submit"
                    className="bg-primary w-full text-white mt-6"
                  >
                    Send Message
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

export default ContactUsForm;
