import { z } from 'zod';

const loginSchema = z.object({
  identifier: z.string().email(),
  password: z.string().min(8).max(15),
});
export type LoginSchemaDto = z.infer<typeof loginSchema>;

export default loginSchema;
