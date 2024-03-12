import { urlConstants } from '../api/constants';
import { httpClient } from '../api/httpClient';
import { LoginSchemaDto } from '../components/Login/utils/validation';
import { AuthResponse } from '../utils/common.type';

export default {
  auth: (payload: LoginSchemaDto): Promise<AuthResponse> => {
    return httpClient.post(`${urlConstants.auth}`, payload);
  },
};
