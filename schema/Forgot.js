import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be less than 50 characters long" }),
});

export default formSchema;
