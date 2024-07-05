"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
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
import courseSchema from "@/schema/Course";

const SelectCourse = ({ courses }) => {
  const form = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course: "",
    },
  });

  const handleCourseChange = async (value) => {
    form.setValue("course", value);

    try {
      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: value }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      console.log("API response:", result);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form className="space-y-4 w-5/6 mx-auto">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem className="flex w-full gap-x-4 items-center">
                <FormLabel className="text-base whitespace-nowrap">
                  All Courses:
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      handleCourseChange(value);
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Choose a course"
                        className="focus:ring-0"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default SelectCourse;
