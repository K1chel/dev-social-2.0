import * as z from "zod";

export const loginValidation = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerValidation = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(6, {
    message: "Password is required and must contain at least 6 characters",
  }),
});

export const createPostValidation = z.object({
  text: z
    .string()
    .min(1, { message: "Text is required" })
    .max(600, { message: "Text must be less than 600 characters" }),
  image: z.string().optional(),
});
