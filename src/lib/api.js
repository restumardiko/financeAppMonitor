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

// 🔁 Response Interceptor — auto refresh token kalau expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // minta access token baru ke server pakai refresh token (yang di cookie)
        await api.post("/refresh");
        return api(originalRequest); // retry request sebelumnya
      } catch (err) {
        // kalau refresh gagal, logout user
        console.error("Refresh token expired / invalid", err);

        // redirect ke login page atau clear state
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
