import { z } from 'zod';

const registerSchema = z.object({
  wevent: z.string(),
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string().min(5).max(15),
  confirmPassword: z.string().min(5).max(15),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export { registerSchema };
