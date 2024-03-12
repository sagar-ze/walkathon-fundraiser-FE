import { z } from 'zod';

const registerSchema = z
  .object({
    fullName: z.string().min(2).max(30),
    email: z.string().email(),
    address: z.string().optional().nullable(),
    phoneNumber: z.string(),
    password: z.string().min(5).max(15),
    confirmPassword: z.string().min(5).max(15),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export { registerSchema };
