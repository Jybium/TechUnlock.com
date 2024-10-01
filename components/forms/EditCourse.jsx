"use client";

import React, { useEffect, useState } from "react";
import "@/components/forms/addcourseformstyle.css";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import courseSchema from "@/schema/AddCourse";
import Select from "react-select";
import { IoMdImage } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import LoadingSpinner from "../reusables/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import axios from "axios";
import skillSuggestions from "@/data/skills";
import AddonsSection from "./AddOnSection";
import CurriculumSection from "./CurriculumSection";
import { editCourses } from "@/services/course";
import { useCourses } from "@/Context/courses";

const EditCourseForm = () => {
  const [imagePreview, setImagePreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();
  const { editId } = useParams();

  const { courses, loading } = useCourses();
  const [filteredCourses, setFilteredCourses] = useState([]);

  const methods = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      category: "",
      cover_image: "",
      description: "",
      difficulty: "",
      duration: "",
      is_certificate: "",
      instructor: "",
      start_date: "",
      start_time: "",
      is_physical: false,
      price: 0,
      modules: [],
      addon: [],
      course_skills: [],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    reset,
  } = methods;
  console.log(errors);
  useEffect(() => {
    const course = courses?.courses;
    setFilteredCourses(course?.find((course) => course?.id === +editId));
  }, [courses]);

  useEffect(() => {
    if (filteredCourses) {
      reset({
        title: filteredCourses?.title || "",
        category: filteredCourses?.category || "",
        description: filteredCourses?.description || "",
        difficulty: filteredCourses?.difficulty || "",
        duration: filteredCourses?.duration || "",
        is_certificate: filteredCourses?.is_certificate ? "true" : "false",
        instructor: filteredCourses?.instructor || "",
        start_date: filteredCourses?.start_date || "",
        start_time: filteredCourses?.start_time || "",
        is_physical: filteredCourses?.is_physical ? "true" : "false",
        price: filteredCourses?.price || 0,
        // modules: filteredCourses?.modules || [],
        // addon: filteredCourses?.addon || [],
        // course_skills: filteredCourses.course_skills?.map((skill) => ({
        //   name: skill.name,
        // })),
      });

      // Set cover image preview if available
      if (filteredCourses?.cover_image) {
        setImagePreview(filteredCourses?.cover_image);
      }
    }
  }, [filteredCourses, reset]);

  const handleSelectChange = (selectedOptions) => {
    setValue(
      "course_skills",
      selectedOptions
        ? selectedOptions.map((option) => ({ name: option.value }))
        : []
    );
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "course_skills",
  });

  const onSubmit = async (data) => {
    if (!navigator.onLine) {
      showErrorToast("You are offline. Please check your network connection.");
      return;
    }

    try {
      setIsLoading(true);

      // Secure image upload (Cover Image)
      const formData = new FormData();
      formData.append("file", data.cover_image);
      formData.append("upload_preset", "ml_default");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/ddynvenje/image/upload",
        formData
      );
      const coverImageUrl = cloudinaryResponse.data.secure_url;

      // // Secure addon images upload
      // const addonImagesPromises = data.addon?.map(async (addon) => {
      //   const addonFormData = new FormData();
      //   addonFormData.append("file", addon.add_on_image);
      //   addonFormData.append("upload_preset", "ml_default");

      //   const addonCloudinaryResponse = await axios.post(
      //     "https://api.cloudinary.com/v1_1/ddynvenje/image/upload",
      //     addonFormData
      //   );

      //   return {
      //     ...addon,
      //     add_on_image: addonCloudinaryResponse.data.secure_url,
      //   };
      // });

      // const addonImages = await Promise.all(addonImagesPromises || []);

      const updatedData = {
        ...data,
        cover_image: coverImageUrl,
        // addon: addonImages.length > 0 ? addonImages : undefined,
      };

      const result = await editCourses(editId, updatedData);
      showSuccessToast(result.message || "Course updated successfully.");
      reset();
      router.push("/dashboard/courses");
    } catch (error) {
      showErrorToast(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="p-6">
      <div className="w-[95%] space-y-7">
        {isLoading && <LoadingSpinner />}
        <h1 className="text-pri10 text-4xl font-semibold">Edit Course</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
            encType="multipart/form-data"
          >
            {/* Course Details Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">
                Course Details
              </h1>

              <div className="grid gap-4">
                <div className="flex gap-x-5 w-5/6">
                  {/* Course Title */}
                  <div className="w-full">
                    <label htmlFor="title">Course Title</label>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter course title"
                        />
                      )}
                    />
                    {errors.title && (
                      <span className="text-red-500">
                        {errors.title.message}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="w-full">
                    <label htmlFor="category">Category</label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <select {...field}>
                          <option value="">Select Category</option>
                          <option value="AI">Artificial Intelligence</option>
                          <option value="DA">Data Analysis</option>
                          <option value="CYBER">Cyber Security</option>
                          <option value="DM">Digital Marketing</option>
                          <option value="WEB">Web Development</option>
                          <option value="UI/UX">UI/UX Design</option>
                        </select>
                      )}
                    />
                    {errors.category && (
                      <span className="text-red-500">
                        {errors.category.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cover Image */}
                <div className="w-full">
                  <div className="w-full">
                    <label htmlFor="cover_image">Cover Image</label>
                    <div className="relative w-[30%] h-60">
                      <Controller
                        name="cover_image"
                        control={control}
                        render={({ field }) =>
                          typeof window !== "undefined" && (
                            <input
                              type="file"
                              accept="image/*"
                              className="w-full h-60 relative opacity-0 z-10"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  field.onChange(file); // Store the file object directly

                                  // Generate a preview URL for the selected image
                                  const previewUrl = URL.createObjectURL(file);
                                  setImagePreview(previewUrl); // Set the preview URL
                                }
                              }}
                            />
                          )
                        }
                      />

                      {/* Image Preview or Default UI */}
                      <div
                        className={`absolute top-0 left-0 w-full h-60 rounded-md flex items-center justify-center ${
                          imagePreview ? "" : "bg-[#EAF7FC]"
                        }`}
                        style={{
                          backgroundImage: imagePreview
                            ? `url(${imagePreview})`
                            : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* If no image preview, show the default "Add Photo" UI */}
                        {!imagePreview && (
                          <div className="h-1/2">
                            <IoMdImage
                              size={100}
                              className="text-gray-400 mx-auto"
                            />
                            <p className="text-sm text-[#5249C5] text-center flex items-center gap-x-2">
                              <span>
                                <CiCirclePlus className="text-gray-600 text-lg" />
                              </span>{" "}
                              Add Photo
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {errors.cover_image && (
                    <span className="text-red-500">
                      {errors.cover_image.message}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="w-full">
                  <label htmlFor="description">Description</label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder="Enter course description"
                      ></textarea>
                    )}
                  />
                  {errors.description && (
                    <span className="text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Course Overview Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">
                Course Overview
              </h1>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                {/* Difficulty Level */}
                <div>
                  <label htmlFor="difficulty">Difficulty Level</label>
                  <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select Difficulty</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    )}
                  />
                  {errors.difficulty && (
                    <span className="text-red-500">
                      {errors.difficulty.message}
                    </span>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration">Duration</label>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select Duration</option>
                        <option value="4 weeks">4 weeks</option>
                        <option value="6 weeks">6 weeks</option>
                        <option value="10 weeks">10 weeks</option>
                      </select>
                    )}
                  />
                  {errors.duration && (
                    <span className="text-red-500">
                      {errors.duration.message}
                    </span>
                  )}
                </div>

                {/* Certificate */}
                <div className="">
                  <label htmlFor="is_certificate">Certificate</label>
                  <Controller
                    name="is_certificate"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    )}
                  />
                  {errors.is_certificate && (
                    <span className="text-red-500">
                      {errors.is_certificate.message}
                    </span>
                  )}
                </div>

                {/* Course Mode */}
                <div className="">
                  <label htmlFor="is_physical">Mode of delivery</label>
                  <Controller
                    name="is_physical"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select</option>
                        <option value="true">Physical</option>
                        <option value="false">Online</option>
                      </select>
                    )}
                  />
                  {errors.is_physical && (
                    <span className="text-red-500">
                      {errors.is_physical.message}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price">Price</label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="Enter course price"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    )}
                  />
                  {errors.price && (
                    <span className="text-red-500">{errors.price.message}</span>
                  )}
                </div>

                {/* Instructor Name */}
                <div>
                  <label htmlFor="instructor">Instructor Name</label>
                  <Controller
                    name="instructor"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter instructor name"
                      />
                    )}
                  />
                  {errors.instructor && (
                    <span className="text-red-500">
                      {errors.instructor.message}
                    </span>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label htmlFor="start_date">Start Date</label>
                  <Controller
                    name="start_date"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="date"
                        className="w-full"
                        placeholder="Select start date"
                      />
                    )}
                  />
                  {errors.start_date && (
                    <span className="text-red-500">
                      {errors.start_date.message}
                    </span>
                  )}
                </div>

                {/* Start Time */}
                <div>
                  <label htmlFor="start_time">Start Time</label>
                  <Controller
                    name="start_time"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="time"
                        className="w-full"
                        placeholder="Select start time"
                      />
                    )}
                  />
                  {errors.start_time && (
                    <span className="text-red-500">
                      {errors.start_time.message}
                    </span>
                  )}
                </div>
              </div>

              {/* Skills to Gain */}
              {/* <div className="w-full space-y-2">
                <label className="font-semibold" id="course_skills">
                  Skills to Gain
                </label>
                <Controller
                  control={control}
                  name="course_skills"
                  className="h-5 py-2"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={skillSuggestions}
                      isMulti
                      onChange={handleSelectChange}
                      value={fields.map((field) => ({
                        value: field.name,
                        label: field.name,
                      }))}
                      placeholder="Type to add skill"
                      className="basic-multi-select w-full"
                      classNamePrefix="select"
                    />
                  )}
                />
              </div> */}
            </div>

            {/* Curriculum Section */}
            {/* <CurriculumSection
              control={control}
              methods={methods}
              errors={errors}
            /> */}

            {/* Add-ons Section */}
            {/* <AddonsSection
              control={control}
              methods={methods}
              errors={errors}
            /> */}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="w-1/5 mt-4">
                Submit
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
};

export default EditCourseForm;
