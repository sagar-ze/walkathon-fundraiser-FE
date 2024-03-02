import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(255),
  fullName: z.string().min(2),
  phoneNumber: z.string(),
});

export { registerSchema };
