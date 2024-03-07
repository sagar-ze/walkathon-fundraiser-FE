import { z } from 'zod';

const loginForgetSchema = z.object({
  email: z.string().email(),
});

export default loginForgetSchema;
