import { z } from 'zod';

const loginResetSchema = z.object({
  password: z.string().min(8).max(15),
  confirmPassword: z.string().min(8).max(15),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default loginResetSchema;
