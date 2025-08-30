import { z } from "zod";

const videoSchema = z.object({
  title: z.string().nonempty({ message: "Video title is required" }),
  description: z
    .string()
    .nonempty({ message: "Video description is required" }),
  video_url: z.string().url({ message: "Valid video URL is required" }),
  duration: z.string().nonempty({ message: "Video duration is required" }),
});

const summarySchema = z.object({
  text: z.string().nonempty({ message: "Summary text is required" }),
});

const quizSchema = z.object({
  question: z.string().nonempty({ message: "Question is required" }),
  option_a: z.string().nonempty({ message: "Option A is required" }),
  option_b: z.string().nonempty({ message: "Option B is required" }),
  option_c: z.string().nonempty({ message: "Option C is required" }),
  option_d: z.string().nonempty({ message: "Option D is required" }),
  correct_answer: z.enum(["A", "B", "C", "D"], {
    message: "Correct answer must be A, B, C, or D",
  }),
});

const moduleSchema = z.object({
  title: z.string().nonempty({ message: "Module title is required" }),
  description: z
    .string()
    .nonempty({ message: "Module description is required" }),
  duration: z.string().nonempty({ message: "Module duration is required" }),
  order: z
    .number()
    .positive({ message: "Module order must be a positive number" }),
  videos: z.array(videoSchema).optional(),
  summaries: z.array(summarySchema).optional(),
  quizzes: z.array(quizSchema).optional(),
});

const badgeSchema = z.object({
  title: z.string().nonempty({ message: "Badge title is required" }),
  description: z
    .string()
    .nonempty({ message: "Badge description is required" }),
  icon: z.string().url({ message: "Valid badge icon URL is required" }),
});

const communityLinkSchema = z.object({
  description: z
    .string()
    .nonempty({ message: "Community link description is required" }),
  link: z.string().url({ message: "Valid community link URL is required" }),
});

const courseSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  short_description: z
    .string()
    .nonempty({ message: "Short description is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  duration: z.string().nonempty({ message: "Duration is required" }),
  is_published: z.boolean(),
  is_paid: z.boolean(),
  price: z
    .number()
    .nonnegative({ message: "Price must be a non-negative number" }),
  cover_image: z
    .instanceof(File)
    .optional()
    .refine((value) => value instanceof File || value === "", {
      message: "Image must be a File or empty",
    }),
  tags: z.array(z.string()).optional(),
  modules: z
    .array(moduleSchema)
    .min(1, { message: "At least one module is required" }),
  badge: badgeSchema.optional(),
  community_link: communityLinkSchema.optional(),
  // Legacy fields for backward compatibility
  category: z.string().optional(),
  difficulty: z.string().optional(),
  is_certificate: z.string().optional(),
  instructor_name: z.string().optional(),
  start_date: z.string().optional(),
  start_time: z.string().optional(),
  course_skills: z.array(z.object({ name: z.string() })).optional(),
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
});

export default courseSchema;
