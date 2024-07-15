import React, { useEffect, useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import { IoMdImage } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { showErrorToast, showSuccessToast } from "@/helpers/toastUtil";
import { addCourse } from "@/services/register";
import LoadingSpinner from "../reusables/LoadingSpinner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const schema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  category: z.string().nonempty({ message: "Category is required" }),
  cover_image: z.string().optional(),
  description: z.string().nonempty({ message: "Description is required" }),
  difficulty: z.string().nonempty({ message: "Difficulty is required" }),
  duration: z.string().nonempty({ message: "Duration is required" }),
  is_certificate: z.string().nonempty({ message: "Certificate is required" }),
  instructor_name: z
    .string()
    .nonempty({ message: "Instructor name is required" }),
  price: z
    .number()
    .nonnegative({ message: "Price must be a non-negative number" }),
  modules: z
    .array(
      z.object({
        selectModule: z.string().nonempty({ message: "Module is required" }),
        title: z.string().nonempty({ message: "Module title is required" }),
        description: z
          .string()
          .nonempty({ message: "Module description is required" }),
      })
    )
    .optional(),
  addon: z
    .array(
      z.object({
        title: z.string().nonempty({ message: "Addon title is required" }),
        add_on_image: z.string().optional(),
        description: z
          .string()
          .nonempty({ message: "Addon description is required" }),
      })
    )
    .optional(),
});

const skillSuggestions = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Python", label: "Python" },
  { value: "Django", label: "Django" },
];

const CourseForm = () => {
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
      instructor_name: "",
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

  // console.log(errors);

  const onSubmit = async (data) => {
    console.log(data);
    // console.log(typeof data.cover_image);

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("difficulty", data.difficulty);
    formData.append("duration", data.duration);
    formData.append("is_certificate", data.is_certificate);
    formData.append("instructor_name", data.instructor_name);
    formData.append("price", data.price);

    // Append course skills as individual items
    data.course_skills.forEach((skill, index) => {
      formData.append(`course_skills[${index}]["name"]`, skill.name);
    });

    // Append cover image binary data
    formData.append("cover_image", data.cover_image);

    // Append modules
    data.modules.forEach((module, index) => {
      formData.append(
        `modules[${index}]["title"]`,
        `${module.selectModule}: ${module.title}`
      );
      formData.append(`modules[${index}][description]`, module.description);
    });

    // Append add-ons
    data.addon.forEach((addon, index) => {
      formData.append(`addon[${index}]["title"]`, addon.title);
      formData.append(`addon[${index}][description]`, addon.description);
      formData.append(`addon[${index}][add_on_image]`, addon.add_on_image);
    });

    // console.log(formData);

    // Handle offline state
    if (!isOnline) {
      showErrorToast("You are offline. Please check your network connection.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await addCourse(formData);
      showSuccessToast(result.message || "Course created successfully.");
      router.push("/courses/payment");
    } catch (error) {
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
                        render={({ field }) => (
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full h-60 relative opacity-0 z-10"
                            onChange={(e) => {
                              field.onChange(e.target.files[0]); // Store the file object directly
                            }}
                          />
                        )}
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
                        <option value="3 hrs per week">3 hrs per week</option>
                        <option value="5 hrs per week">5 hrs per week</option>
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
                  <label htmlFor="instructor_name">Instructor Name</label>
                  <Controller
                    name="instructor_name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Enter instructor name"
                      />
                    )}
                  />
                  {errors.instructor_name && (
                    <span className="text-red-500">
                      {errors.instructor_name.message}
                    </span>
                  )}
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
                </div>
              </div>
            </div>

            {/* Curriculum Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">Curriculum</h1>
              {methods.watch("modules")?.map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  {/* Module */}
                  <div>
                    <label htmlFor={`modules.${index}.selectModule`}>
                      Module
                    </label>
                    <Controller
                      name={`modules.${index}.selectModule`}
                      control={control}
                      render={({ field }) => (
                        <select {...field}>
                          <option value="">Select module</option>
                          <option value="module1">Module 1</option>
                          <option value="module2">Module 2</option>
                          <option value="module3">Module 3</option>
                        </select>
                      )}
                    />
                    {errors.modules?.[index]?.selectModule && (
                      <span className="text-red-500">
                        {errors.modules[index].selectModule.message}
                      </span>
                    )}
                  </div>

                  {/* Module Title */}
                  <div>
                    <label htmlFor={`modules.${index}.title`}>
                      Module Title
                    </label>
                    <Controller
                      name={`modules.${index}.title`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter module title"
                        />
                      )}
                    />
                    {errors.modules?.[index]?.title && (
                      <span className="text-red-500">
                        {errors.modules[index].title.message}
                      </span>
                    )}
                  </div>

                  {/* Module Description */}
                  <div className="col-span-2">
                    <label htmlFor={`modules.${index}.description`}>
                      Module Description
                    </label>
                    <Controller
                      name={`modules.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter module description"
                          className="mt-2"
                        />
                      )}
                    />
                    {errors.modules?.[index]?.description && (
                      <span className="text-red-500">
                        {errors.modules[index].description.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="bg-pri1 text-[#1C6B88] border border-primary mt-4"
                onClick={() =>
                  methods.setValue("modules", [
                    ...(methods.getValues("modules") || []),
                    { selectModule: "", title: "", description: "" },
                  ])
                }
              >
                Add Module
              </Button>
            </div>

            {/* Add-ons Section */}
            <div className="space-y-3">
              <h1 className="text-pri10 text-3xl font-semibold">Add-ons</h1>
              {methods.watch("addon")?.map((_, index) => (
                <div key={index} className="grid gap-5">
                  {/* Addon Title */}
                  <div className="w-1/2">
                    <label htmlFor={`addon.${index}.title`}>Addon Title</label>
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
                        render={({ field }) => (
                          <input
                            type="file"
                            accept="image/*"
                            className="w-full h-60 relative opacity-0 z-10"
                            onChange={(e) => {
                              field.onChange(e.target.files[0]); // Store the file object directly
                            }}
                          />
                        )}
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
              ))}

              <Button
                type="button"
                className="bg-pri1 text-[#1C6B88] border border-primary mt-4"
                onClick={() =>
                  methods.setValue("addon", [
                    ...(methods.getValues("addon") || []),
                    { title: "", add_on_image: "", description: "" },
                  ])
                }
              >
                Add Add-on
              </Button>
            </div>

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

export default CourseForm;
