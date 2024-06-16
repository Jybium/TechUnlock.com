import * as z from "zod";

const courseSchema = z.object({
  course: z.string().nonempty("Please select a course"),
});

export default courseSchema;
