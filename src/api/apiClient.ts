import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to conditionally add token to protected requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { needsAuth?: boolean }) => {
    // Only add the Authorization header if the needsAuth flag is true and the token exists
    if (config.needsAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle error globally (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      // Redirect to login or handle token refresh
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
