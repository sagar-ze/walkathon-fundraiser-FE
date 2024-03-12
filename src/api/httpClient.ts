import axios from 'axios';
import localStorageService from '../services/localStorageService';

axios.defaults.baseURL = 'http://localhost:1337/api';
// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Modify config before sending the request
    const user = localStorageService.getAuthToken();
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.jwt}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // Modify response data before passing it to the calling function
    return response.data;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  },
);

export const httpClient = axios;
