import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export const signupSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    name: z.string().min(3, "Nama minimal 3 karakter"),
    confirmPassword: z.string(),
    //   .min(8, "Konfirmasi password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password  tidak sama",
    path: ["confirmPassword"], // error diarahkan ke field confirmPassword
  });
