import { z } from "zod";

const courseSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  category: z.string().nonempty({ message: "Category is required" }),
  cover_image: z
    .instanceof(File)
    .optional()
    .refine((value) => value instanceof File || value === "", {
      message: "Image must be a File or empty",
    }),
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
        add_on_image: z
          .instanceof(File)
          .optional()
          .refine((value) => value instanceof File || value === "", {
            message: "Addon image must be a File or empty",
          }),
        description: z
          .string()
          .nonempty({ message: "Addon description is required" }),
      })
    )
    .optional(),
  course_skills: z.array(z.object({ name: z.string() })),
});

export default courseSchema;
