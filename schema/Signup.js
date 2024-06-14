import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(50, { message: "Email must be less than 50 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password must be less than 50 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  remember_me: z.boolean().default(false).optional(),
});

export default formSchema;
