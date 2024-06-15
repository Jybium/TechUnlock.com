import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(12, { message: "Password must be at least 12 characters long" })
      .max(50, { message: "Password must be less than 50 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirm_password: z
      .string()
      .min(12, "Confirm password must be at least 12 characters long")
      .max(50, { message: "Password must be less than 50 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });
export default formSchema;
