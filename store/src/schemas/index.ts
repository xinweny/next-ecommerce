import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required"
  }),
  lastName: z.string().min(1, {
    message: "Last name is required"
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
})