"use client";

import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Button } from "../ui/button";

const CurriculumSection = ({ methods, control, errors }) => {
  return (
    <div className="space-y-3">
      <h1 className="text-pri10 text-3xl font-semibold">Curriculum</h1>
      {methods.watch("modules")?.map((_, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          {/* Module */}
          <div>
            <label htmlFor={`modules.${index}.selectModule`}>Module</label>
            <Controller
              name={`modules.${index}.selectModule`}
              control={control}
              render={({ field }) => (
                <select {...field}>
                  <option value="">Select module</option>
                  <option value="Module 1">Module 1</option>
                  <option value="Module 2">Module 2</option>
                  <option value="Module 3">Module 3</option>
                  <option value="Module 4">Module 4</option>
                  <option value="Module 5">Module 5</option>
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
            <label htmlFor={`modules.${index}.title`}>Module Title</label>
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

          {/* Remove Module Button */}
          <Button
            type="button"
            className="bg-red-500 text-white mt-2 col-span-2 w-fit"
            onClick={() => {
              const currentModules = methods.getValues("modules") || [];
              currentModules.splice(index, 1); // Remove the module
              methods.setValue("modules", currentModules); // Update the form state
            }}
          >
            Remove Module
          </Button>
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
  );
};

export default CurriculumSection;
