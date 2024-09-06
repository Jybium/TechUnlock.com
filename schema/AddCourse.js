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
  start_date: z.string().refine(
    (val) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to the start of the day
      return !isNaN(date.getTime()) && date >= today;
    },
    {
      message:
        "Expiry date must be a valid date and not less than today's date.",
    }
  ),
  start_time: z
    .string()
    .nonempty({ message: "Start time is required" })
    .refine(
      (time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), // 24-hour format "HH:MM"
      {
        message: "Start time must be in 24-hour format HH:MM",
      }
    )
    // Uncomment below for 12-hour format
    // .refine(
    //   (time) => /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(time), // 12-hour format "HH:MM AM/PM"
    //   {
    //     message: "Start time must be in 12-hour format HH:MM AM/PM",
    //   }
    // )
    .refine(
      (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        // Business hours: 09:00 - 17:59
        return hours >= 9 && hours < 18;
      },
      {
        message: "Start time must be between 09:00 and 17:59",
      }
    ),
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
