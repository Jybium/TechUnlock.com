"use client";

import React from "react";
import { motion } from "framer-motion";
import { FormProvider, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { course } from "@/data/courses";
import { useSearchParams } from "next/navigation";

const SelectCourse = ({ setFilter, filter }) => {
  const methods = useForm();
  const searchParams = useSearchParams();

  const handleInputChange = (value) => {
    setFilter(value);
    console.log(filter);
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4 w-5/6 mx-auto">
        <FormProvider>
          <Form {...methods}>
            <FormItem className="flex w-full lg:w-[90%] lg:mx-auto gap-x-4 items-center">
              <FormLabel className="text-base whitespace-nowrap">
                All Courses:
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    handleInputChange(value);
                  }}
                  value={filter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder="Choose a course"
                      className="focus:ring-0"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {course.map((course) => (
                      <SelectItem key={course.id} value={course.value}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </Form>
        </FormProvider>
      </div>
    </motion.div>
  );
};

export default SelectCourse;
