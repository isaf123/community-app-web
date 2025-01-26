import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    name: z.string().min(1, { message: "cant blank" }),
    password: z
      .string()
      .min(8, { message: "Passwortd must be at least 8 characters" }),
    repassword: z.string(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Password do not match",
    path: ["repassword"],
  });
