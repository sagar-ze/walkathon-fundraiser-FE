import { AuthResponse } from '../utils/common.type';

export default {
  setAuthToken(data: AuthResponse) {
    localStorage.setItem('identifier', JSON.stringify(data));
  },

  getAuthToken(): AuthResponse | null {
    const result = localStorage.getItem('identifier');
    if (result) return JSON.parse(result);
    return null;
  },

  removeAuthToken(): void {
    localStorage.removeItem('identifier');
  },
};
