import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const custom = config;
    const accessToken = Cookies.get('access_token');
    if (accessToken) {
      custom.headers.Authorization = `Bearer ${accessToken}`;
    }
    return custom;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const refreshToken = Cookies.get('refresh_token');
    if (error.response?.status === 401 && refreshToken) {
      try {
        const response = await axios.get(`${BASE_URL}/user/generate-access-token`, {
          headers: { Authorization: `Bearer ${refreshToken}` },
          timeout: 10000,
        });
        const { data } = response.data;
        if (data.access_token && data.refresh_token) {
          Cookies.set('access_token', data.access_token);
          Cookies.set('refresh_token', data.refresh_token);
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
