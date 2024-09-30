import { useState } from "react";
import { Controller } from "react-hook-form";
import { IoMdImage } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "../ui/button";

const AddonsSection = ({ methods, control, errors }) => {
  // State to store image previews for each addon
  const [imagePreviews, setImagePreviews] = useState({});

  const handleImageChange = (e, index, field) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      field.onChange(file); // Store the file object directly

      // Generate a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);

      // Update the image preview for the specific index
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [index]: previewUrl,
      }));
    }
  };

  const handleRemoveAddon = (index) => {
    // Remove the addon at the specified index
    const currentAddons = methods.getValues("addon") || [];
    currentAddons.splice(index, 1); // Remove the addon
    methods.setValue("addon", currentAddons); // Update the form state
  };

  return (
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
                <input {...field} type="text" placeholder="Enter addon title" />
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
            <label htmlFor={`addon.${index}.add_on_image`}>Addon Image</label>
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
                      onChange={(e) => handleImageChange(e, index, field)}
                    />
                  )
                }
              />

              {/* Image Preview or Default UI */}
              <div
                className={`absolute top-0 left-0 w-full h-60 rounded-md flex items-center justify-center ${
                  imagePreviews[index] ? "" : "bg-[#EAF7FC]"
                }`}
                style={{
                  backgroundImage: imagePreviews[index]
                    ? `url(${imagePreviews[index]})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* If no image preview, show the default "Add Photo" UI */}
                {!imagePreviews[index] && (
                  <div className="h-1/2">
                    <IoMdImage size={100} className="text-gray-400 mx-auto" />
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

          {/* Remove Addon Button */}
          <Button
            type="button"
            className="bg-red-500 text-white mt-2 w-fit"
            onClick={() => handleRemoveAddon(index)}
          >
            Remove Add-on
          </Button>
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
  );
};

export default AddonsSection;
