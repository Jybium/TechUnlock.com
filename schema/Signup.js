import { z } from "zod";

const formSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "First name must be less than 2 characters long" }),
    last_name: z
      .string()
      .min(2, { message: "Last name must be less than 2 characters long" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .max(50, { message: "Email must be less than 50 characters long" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms of use",
    }),
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
    confirm_password: z
      .string()
      .min(8, "Confirm password must be at least 8 characters long")
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
