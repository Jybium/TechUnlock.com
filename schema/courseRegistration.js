import * as z from "zod";

const courseRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  gender: z.string().min(1, "Gender is required"),
  course: z.string().min(1, "Course is required"),
  agreeTerms: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the terms and conditions"
    ),
  confirmInfo: z
    .boolean()
    .refine((val) => val === true, "You must confirm the information is true"),
});

export default courseRegistrationSchema;
