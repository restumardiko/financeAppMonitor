import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const refreshClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh"
    ) {
      originalRequest._retry = true;

      if (isRefreshing && refreshPromise) {
        await refreshPromise;
        const newToken = localStorage.getItem("access_token");

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }

      try {
        isRefreshing = true;

        refreshPromise = refreshClient.post("/refresh");

        const res = await refreshPromise;
        const newAccessToken = res.data.token;

        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
