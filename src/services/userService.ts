import { z } from 'zod';
import { httpClient } from '../api/httpClient';
import { urlConstants } from '../api/constants';
import { registerSchema } from '../components/Register/utils/validation';
import { UserDetail } from '../utils/common.type';
export type RegisterSchema = z.infer<typeof registerSchema>;

export default {
  register(payload: RegisterSchema) {
    return httpClient.post(`${urlConstants.register}`, {
      ...payload,
      username: payload.email,
    });
  },

  me(): Promise<UserDetail> {
    return httpClient.get(`${urlConstants.me}`);
  },
};
