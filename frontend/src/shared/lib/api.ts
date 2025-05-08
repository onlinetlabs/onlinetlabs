import axios from 'axios';
import { auth } from 'auth';

console.log('API URL:', process.env.API_URL);

const api = axios.create({
  baseURL: process.env.API_URL, // empty means relative path
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const session = await auth();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
    // You can standardize error formatting here if needed
    return Promise.reject(error);
  }
);

export { api };
