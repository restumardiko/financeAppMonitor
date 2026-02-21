import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🔐 Request Interceptor — nambah token di setiap request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/refresh");

        const newAccessToken = res.data.token;

        localStorage.setItem("access_token", newAccessToken);

        // Update header request lama
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token expired / invalid", err);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
