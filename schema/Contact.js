import * as z from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name should be at least 2 characters long"),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name should be at least 2 characters long"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .regex(
      /^[0-9]{10,15}$/,
      "Phone number must be between 10 to 15 digits long"
    ),
  message: z.string().nonempty("Message is required"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and policy" }),
  }),
});

export default contactSchema;
