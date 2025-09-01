"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@/components/forms/addcourseformstyle.css";
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import courseSchema from "@/schema/AddCourse";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Select from "react-select";
import { IoMdImage } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete, MdAdd } from "react-icons/md";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { createCourse } from "@/services/admin";
import LoadingSpinner from "../reusables/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import axios from "axios";

const skillSuggestions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Python", label: "Python" },
  { value: "Django", label: "Django" },
  { value: "AI Concepts", label: "AI Concepts" },
  { value: "Data types and structures", label: "Data types and structures" },
  { value: "Predictive Models", label: "Predictive Models" },
  { value: "Dependencies", label: "Dependencies" },
  { value: "CSV, JSON, text files", label: "CSV, JSON, text files" },
  { value: "NumPy", label: "NumPy" },
  { value: "Matplotlib", label: "Matplotlib" },
  { value: "Pandas", label: "Pandas" },
  { value: "HTML Basics", label: "HTML Basics" },
  { value: "Domain & Hosting", label: "Domain & Hosting" },
  { value: "HTTPS", label: "HTTPS" },
  { value: "URL", label: "URL" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "GIT", label: "GIT" },
  { value: "Backend Logic", label: "Backend Logic" },
  { value: "Frontend Logic", label: "Frontend Logic" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Responsive Design", label: "Responsive Design" },
  { value: "CSS Frameworks", label: "CSS Frameworks" },
  { value: "Bootstrap", label: "Bootstrap" },
  { value: "UI Design", label: "UI Design" },
  { value: "User Experience", label: "User Experience" },
  { value: "Design Thinking", label: "Design Thinking" },
  { value: "Figma", label: "Figma" },
  { value: "Prototyping", label: "Prototyping" },
  { value: "Wireframing", label: "Wireframing" },
  { value: "Design Principles", label: "Design Principles" },
  { value: "Product Design", label: "Product Design" },
  { value: "Mock-up Design", label: "Mock-up Design" },
  { value: "Design Systems", label: "Design Systems" },
  { value: "Social Media", label: "Social Media" },
  { value: "Content Creation", label: "Content Creation" },
  { value: "Digital Media", label: "Digital Media" },
  {
    value: "Ideal Customer Profile (ICP)",
    label: "Ideal Customer Profile (ICP)",
  },
  { value: "Sponsored Advert", label: "Sponsored Advert" },
  { value: "Target Audience", label: "Target Audience" },
  { value: "SEO", label: "SEO" },
  { value: "PPC", label: "PPC" },
  { value: "Content Marketing", label: "Content Marketing" },
  { value: "Analytics", label: "Analytics" },
  { value: "Content Writing", label: "Content Writing" },
  { value: "Copywriting", label: "Copywriting" },
  { value: "Technical Writing", label: "Technical Writing" },
  { value: "Branding", label: "Branding" },
  { value: "Marketing Strategy", label: "Marketing Strategy" },
  { value: "Marketing Research", label: "Marketing Research" },
  { value: "Marketing Analysis", label: "Marketing Analysis" },
  { value: "KPIs", label: "KPIs" },
  { value: "Reporting", label: "Reporting" },
  { value: "Insights", label: "Insights" },
];

const CourseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    handleOnlineStatus();
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const methods = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      short_description: "",
      description: "",
      duration: "",
      is_published: false,
      is_paid: true,
      price: 0,
      cover_image: "",
      tags: [],
      modules: [],
      badge: {
        title: "",
        description: "",
        icon: "",
      },
      community_link: {
        description: "",
        link: "",
      },
      // Legacy fields
      category: "",
      difficulty: "",
      is_certificate: "",
      instructor: "",
      start_date: "",
      start_time: "",
      course_skills: [],
      addon: [],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = methods;

  const handleSelectChange = (selectedOptions) => {
    setValue(
      "course_skills",
      selectedOptions
        ? selectedOptions.map((option) => ({ name: option.value }))
        : []
    );
  };

  const handleTagsChange = (selectedOptions) => {
    setValue(
      "tags",
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  const { fields: skillFields } = useFieldArray({
    control,
    name: "course_skills",
  });

  const {
    fields: moduleFields,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "modules",
  });

  const {
    fields: addonFields,
    append: appendAddon,
    remove: removeAddon,
  } = useFieldArray({
    control,
    name: "addon",
  });

  const uploadToBunny = async (
    file,
    type = "image",
    courseTitle = "",
    index = ""
  ) => {
    try {
      const { uploadToBunny: uploadBunny, uploadCourseMedia } = await import(
        "@/helpers/bunny-uploader"
      );

      if (type === "video" || type === "badge") {
        return await uploadCourseMedia(file, type, courseTitle, index);
      } else {
        return await uploadBunny(file, type);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data);

    if (!navigator.onLine) {
      showErrorToast("You are offline. Please check your network connection.");
      return;
    }

    try {
      setIsLoading(true);

      // Upload cover image to Bunny.net
      let coverImageUrl = "";
      if (data.cover_image instanceof File) {
        coverImageUrl = await uploadToBunny(
          data.cover_image,
          "image",
          data.title
        );
      }

      // Upload badge icon if provided
      let badgeIconUrl = "";
      if (data.badge?.icon instanceof File) {
        badgeIconUrl = await uploadToBunny(
          data.badge.icon,
          "badge",
          data.title
        );
      }

      // Upload addon images
      const addonImagesPromises = data.addon?.map(async (addon, index) => {
        if (addon.add_on_image instanceof File) {
          const addonImageUrl = await uploadToBunny(
            addon.add_on_image,
            "image",
            data.title,
            `addon-${index}`
          );
          return {
            ...addon,
            add_on_image: addonImageUrl,
          };
        }
        return addon;
      });

      const addonImages = await Promise.all(addonImagesPromises || []);

      // Process modules - upload video files if they are File objects
      const processedModules = await Promise.all(
        data.modules.map(async (module, moduleIndex) => {
          const processedVideos = await Promise.all(
            (module.videos || []).map(async (video, videoIndex) => {
              if (video.video_url instanceof File) {
                const videoUrl = await uploadToBunny(
                  video.video_url,
                  "video",
                  data.title,
                  `module-${moduleIndex + 1}-video-${videoIndex + 1}`
                );
                return {
                  ...video,
                  video_url: videoUrl,
                };
              }
              return video;
            })
          );

          return {
            ...module,
            videos: processedVideos,
          };
        })
      );

      // Prepare final data
      const finalData = {
        ...data,
        cover_image: coverImageUrl,
        modules: processedModules,
        badge: data.badge
          ? {
              ...data.badge,
              icon: badgeIconUrl || data.badge.icon,
            }
          : undefined,
        addon: addonImages.length > 0 ? addonImages : undefined,
      };

      // Send to server
      const result = await createCourse(finalData);
      showSuccessToast(result.message || "Course created successfully.");
      reset();
      router.push("/admin/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      showErrorToast(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6">
      <div className="w-[95%] space-y-7">
        {isLoading && <LoadingSpinner />}
        <h1 className="text-pri10 text-4xl font-semibold">Add Course</h1>
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

                  {/* Short Description */}
                  <div className="w-full">
                    <label htmlFor="short_description">Short Description</label>
                    <Controller
                      name="short_description"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Brief course description"
                        />
                      )}
                    />
                    {errors.short_description && (
                      <span className="text-red-500">
                        {errors.short_description.message}
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
                                  field.onChange(e.target.files[0]);
                                }
                              }}
                            />
                          )
                        }
                      />

                      <div className="absolute top-0 left-0 w-full h-60 bg-[#EAF7FC] rounded-md flex items-center justify-center">
                        <div className="h-1/2">
                          <IoMdImage
                            size={100}
                            className="text-gray-400 mx-auto"
                          />
                          <p className="text-sm text-[#5249C5] text-center flex items-center gap-x-2">
                            <span className="">
                              <CiCirclePlus className="text-gray-600 text-lg" />
                            </span>{" "}
                            Add Photo
                          </p>
                        </div>
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
                        placeholder="Enter detailed course description"
                        rows={4}
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

            {/* Course Settings Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">
                Course Settings
              </h1>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5">
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
                        <option value="12 weeks">12 weeks</option>
                      </select>
                    )}
                  />
                  {errors.duration && (
                    <span className="text-red-500">
                      {errors.duration.message}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label htmlFor="price">Price (₦)</label>
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

                {/* Is Paid */}
                <div>
                  <label htmlFor="is_paid">Paid Course</label>
                  <Controller
                    name="is_paid"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value === "true")
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    )}
                  />
                  {errors.is_paid && (
                    <span className="text-red-500">
                      {errors.is_paid.message}
                    </span>
                  )}
                </div>

                {/* Is Published */}
                <div>
                  <label htmlFor="is_published">Published</label>
                  <Controller
                    name="is_published"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value === "true")
                        }
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    )}
                  />
                  {errors.is_published && (
                    <span className="text-red-500">
                      {errors.is_published.message}
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="col-span-2">
                  <label htmlFor="tags">Tags</label>
                  <Controller
                    control={control}
                    name="tags"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={skillSuggestions}
                        isMulti
                        onChange={handleTagsChange}
                        value={watch("tags")?.map((tag) => ({
                          value: tag,
                          label: tag,
                        }))}
                        placeholder="Select or type tags"
                        className="basic-multi-select w-full"
                        classNamePrefix="select"
                      />
                    )}
                  />
                  {errors.tags && (
                    <span className="text-red-500">{errors.tags.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Modules Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h1 className="text-pri10 text-3xl font-semibold">Modules</h1>
                <Button
                  type="button"
                  className="bg-pri1 text-[#1C6B88] border border-primary"
                  onClick={() =>
                    appendModule({
                      title: "",
                      description: "",
                      duration: "",
                      order: moduleFields.length + 1,
                      videos: [],
                      summaries: [],
                      quizzes: [],
                    })
                  }
                >
                  <MdAdd className="mr-2" />
                  Add Module
                </Button>
              </div>

              {moduleFields.map((module, moduleIndex) => (
                <div
                  key={module.id}
                  className="border border-gray-200 rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Module {moduleIndex + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeModule(moduleIndex)}
                    >
                      <MdDelete />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Module Title */}
                    <div>
                      <label htmlFor={`modules.${moduleIndex}.title`}>
                        Module Title
                      </label>
                      <Controller
                        name={`modules.${moduleIndex}.title`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter module title"
                          />
                        )}
                      />
                      {errors.modules?.[moduleIndex]?.title && (
                        <span className="text-red-500">
                          {errors.modules[moduleIndex].title.message}
                        </span>
                      )}
                    </div>

                    {/* Module Duration */}
                    <div>
                      <label htmlFor={`modules.${moduleIndex}.duration`}>
                        Duration
                      </label>
                      <Controller
                        name={`modules.${moduleIndex}.duration`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="e.g., 1 week"
                          />
                        )}
                      />
                      {errors.modules?.[moduleIndex]?.duration && (
                        <span className="text-red-500">
                          {errors.modules[moduleIndex].duration.message}
                        </span>
                      )}
                    </div>

                    {/* Module Description */}
                    <div className="col-span-2">
                      <label htmlFor={`modules.${moduleIndex}.description`}>
                        Description
                      </label>
                      <Controller
                        name={`modules.${moduleIndex}.description`}
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            placeholder="Enter module description"
                            rows={3}
                          />
                        )}
                      />
                      {errors.modules?.[moduleIndex]?.description && (
                        <span className="text-red-500">
                          {errors.modules[moduleIndex].description.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Videos Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium">Videos</h4>
                    {watch(`modules.${moduleIndex}.videos`)?.map(
                      (_, videoIndex) => (
                        <div
                          key={videoIndex}
                          className="border border-gray-100 rounded p-4 space-y-3"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>Video Title</label>
                              <Controller
                                name={`modules.${moduleIndex}.videos.${videoIndex}.title`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Video title"
                                  />
                                )}
                              />
                            </div>
                            <div>
                              <label>Duration</label>
                              <Controller
                                name={`modules.${moduleIndex}.videos.${videoIndex}.duration`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="e.g., 12:30"
                                  />
                                )}
                              />
                            </div>
                            <div className="col-span-2">
                              <label>Description</label>
                              <Controller
                                name={`modules.${moduleIndex}.videos.${videoIndex}.description`}
                                control={control}
                                render={({ field }) => (
                                  <textarea
                                    {...field}
                                    placeholder="Video description"
                                    rows={2}
                                  />
                                )}
                              />
                            </div>
                            <div className="col-span-2">
                              <label>Video File or URL</label>
                              <Controller
                                name={`modules.${moduleIndex}.videos.${videoIndex}.video_url`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        field.onChange(e.target.files[0]);
                                      }
                                    }}
                                    className="w-full"
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentVideos =
                          watch(`modules.${moduleIndex}.videos`) || [];
                        setValue(`modules.${moduleIndex}.videos`, [
                          ...currentVideos,
                          {
                            title: "",
                            description: "",
                            video_url: "",
                            duration: "",
                          },
                        ]);
                      }}
                    >
                      Add Video
                    </Button>
                  </div>

                  {/* Summaries Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium">Summaries</h4>
                    {watch(`modules.${moduleIndex}.summaries`)?.map(
                      (_, summaryIndex) => (
                        <div
                          key={summaryIndex}
                          className="border border-gray-100 rounded p-4"
                        >
                          <label>Summary Text</label>
                          <Controller
                            name={`modules.${moduleIndex}.summaries.${summaryIndex}.text`}
                            control={control}
                            render={({ field }) => (
                              <textarea
                                {...field}
                                placeholder="Enter summary text"
                                rows={3}
                                className="w-full"
                              />
                            )}
                          />
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentSummaries =
                          watch(`modules.${moduleIndex}.summaries`) || [];
                        setValue(`modules.${moduleIndex}.summaries`, [
                          ...currentSummaries,
                          { text: "" },
                        ]);
                      }}
                    >
                      Add Summary
                    </Button>
                  </div>

                  {/* Quizzes Section */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-medium">Quizzes</h4>
                    {watch(`modules.${moduleIndex}.quizzes`)?.map(
                      (_, quizIndex) => (
                        <div
                          key={quizIndex}
                          className="border border-gray-100 rounded p-4 space-y-3"
                        >
                          <div>
                            <label>Question</label>
                            <Controller
                              name={`modules.${moduleIndex}.quizzes.${quizIndex}.question`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  placeholder="Enter question"
                                  className="w-full"
                                />
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label>Option A</label>
                              <Controller
                                name={`modules.${moduleIndex}.quizzes.${quizIndex}.option_a`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Option A"
                                  />
                                )}
                              />
                            </div>
                            <div>
                              <label>Option B</label>
                              <Controller
                                name={`modules.${moduleIndex}.quizzes.${quizIndex}.option_b`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Option B"
                                  />
                                )}
                              />
                            </div>
                            <div>
                              <label>Option C</label>
                              <Controller
                                name={`modules.${moduleIndex}.quizzes.${quizIndex}.option_c`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Option C"
                                  />
                                )}
                              />
                            </div>
                            <div>
                              <label>Option D</label>
                              <Controller
                                name={`modules.${moduleIndex}.quizzes.${quizIndex}.option_d`}
                                control={control}
                                render={({ field }) => (
                                  <input
                                    {...field}
                                    type="text"
                                    placeholder="Option D"
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div>
                            <label>Correct Answer</label>
                            <Controller
                              name={`modules.${moduleIndex}.quizzes.${quizIndex}.correct_answer`}
                              control={control}
                              render={({ field }) => (
                                <select {...field}>
                                  <option value="">
                                    Select correct answer
                                  </option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="C">C</option>
                                  <option value="D">D</option>
                                </select>
                              )}
                            />
                          </div>
                        </div>
                      )
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const currentQuizzes =
                          watch(`modules.${moduleIndex}.quizzes`) || [];
                        setValue(`modules.${moduleIndex}.quizzes`, [
                          ...currentQuizzes,
                          {
                            question: "",
                            option_a: "",
                            option_b: "",
                            option_c: "",
                            option_d: "",
                            correct_answer: "",
                          },
                        ]);
                      }}
                    >
                      Add Quiz
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Badge Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">Badge</h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="badge.title">Badge Title</label>
                  <Controller
                    name="badge.title"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="e.g., Certified Fullstack Developer"
                      />
                    )}
                  />
                  {errors.badge?.title && (
                    <span className="text-red-500">
                      {errors.badge.title.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="badge.description">Badge Description</label>
                  <Controller
                    name="badge.description"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="e.g., Awarded after successful course completion"
                      />
                    )}
                  />
                  {errors.badge?.description && (
                    <span className="text-red-500">
                      {errors.badge.description.message}
                    </span>
                  )}
                </div>

                <div className="col-span-2">
                  <label htmlFor="badge.icon">Badge Icon</label>
                  <Controller
                    name="badge.icon"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                        className="w-full"
                      />
                    )}
                  />
                  {errors.badge?.icon && (
                    <span className="text-red-500">
                      {errors.badge.icon.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Community Link Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">
                Community Link
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="community_link.description">
                    Description
                  </label>
                  <Controller
                    name="community_link.description"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="e.g., Join the student community for help and collaboration"
                      />
                    )}
                  />
                  {errors.community_link?.description && (
                    <span className="text-red-500">
                      {errors.community_link.description.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="community_link.link">Community URL</label>
                  <Controller
                    name="community_link.link"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="url"
                        placeholder="https://community.example.com/course"
                      />
                    )}
                  />
                  {errors.community_link?.link && (
                    <span className="text-red-500">
                      {errors.community_link.link.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Legacy Fields Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">
                Additional Settings
              </h1>
              <div className="grid grid-cols-3 gap-x-4 gap-y-5">
                {/* Category */}
                <div>
                  <label htmlFor="category">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Digital Marketing">
                          Digital Marketing
                        </option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="Artificial Intelligence">
                          Artificial Intelligence
                        </option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </select>
                    )}
                  />
                  {errors.category && (
                    <span className="text-red-500">
                      {errors.category.message}
                    </span>
                  )}
                </div>

                {/* Difficulty Level */}
                <div>
                  <label htmlFor="difficulty">Difficulty Level</label>
                  <Controller
                    name="difficulty"
                    control={control}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="">Select Difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    )}
                  />
                  {errors.difficulty && (
                    <span className="text-red-500">
                      {errors.difficulty.message}
                    </span>
                  )}
                </div>

                {/* Certificate */}
                <div>
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
              <div className="w-full space-y-2">
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
                      value={skillFields.map((field) => ({
                        value: field.name,
                        label: field.name,
                      }))}
                      placeholder="Type to add skill"
                      className="basic-multi-select w-full"
                      classNamePrefix="select"
                    />
                  )}
                />
              </div>
            </div>

            {/* Add-ons Section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h1 className="text-pri10 text-3xl font-semibold">Add-ons</h1>
                <Button
                  type="button"
                  className="bg-pri1 text-[#1C6B88] border border-primary"
                  onClick={() =>
                    appendAddon({
                      title: "",
                      add_on_image: "",
                      description: "",
                    })
                  }
                >
                  <MdAdd className="mr-2" />
                  Add Add-on
                </Button>
              </div>

              {addonFields.map((addon, index) => (
                <div
                  key={addon.id}
                  className="border border-gray-200 rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Add-on {index + 1}
                    </h3>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAddon(index)}
                    >
                      <MdDelete />
                    </Button>
                  </div>

                  <div className="grid gap-5">
                    {/* Addon Title */}
                    <div className="w-1/2">
                      <label htmlFor={`addon.${index}.title`}>
                        Addon Title
                      </label>
                      <Controller
                        name={`addon.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter addon title"
                          />
                        )}
                      />
                      {errors.addon?.[index]?.title && (
                        <span className="text-red-500">
                          {errors.addon[index].title.message}
                        </span>
                      )}
                    </div>

                    {/* Addon Image */}
                    <div>
                      <label htmlFor={`addon.${index}.add_on_image`}>
                        Addon Image
                      </label>
                      <div className="relative w-[30%] h-60">
                        <Controller
                          name={`addon.${index}.add_on_image`}
                          control={control}
                          render={({ field }) =>
                            typeof window !== "undefined" && (
                              <input
                                type="file"
                                accept="image/*"
                                className="w-full h-60 relative opacity-0 z-10"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    field.onChange(e.target.files[0]);
                                  }
                                }}
                              />
                            )
                          }
                        />

                        <div className="absolute top-0 left-0 w-full h-60 bg-[#EAF7FC] rounded-md flex items-center justify-center">
                          <div className="h-1/2">
                            <IoMdImage
                              size={100}
                              className="text-gray-400 mx-auto"
                            />
                            <p className="text-sm text-[#5249C5] text-center flex items-center gap-x-2">
                              <span className="">
                                <CiCirclePlus className="text-gray-600 text-lg" />
                              </span>{" "}
                              Add Photo
                            </p>
                          </div>
                        </div>
                      </div>
                      {errors.addon?.[index]?.add_on_image && (
                        <span className="text-red-500">
                          {errors.addon[index].add_on_image.message}
                        </span>
                      )}
                    </div>

                    {/* Addon Description */}
                    <div className="">
                      <label htmlFor={`addon.${index}.description`}>
                        Addon Description
                      </label>
                      <Controller
                        name={`addon.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            placeholder="Enter addon description"
                          ></textarea>
                        )}
                      />
                      {errors.addon?.[index]?.description && (
                        <span className="text-red-500">
                          {errors.addon[index].description.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" className="w-1/5 mt-4">
                Create Course
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </main>
  );
};

export default CourseForm;
