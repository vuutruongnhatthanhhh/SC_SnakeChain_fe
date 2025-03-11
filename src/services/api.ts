import axios from "axios";
import { refreshAccessToken } from "@/services/authService";

let refreshingToken = false;
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (refreshingToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      refreshingToken = true;

      try {
        await refreshAccessToken();
        console.log("refresh token...");
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        return api(originalRequest);
      } catch (err) {
        alert("Session hết hạn. Vui lòng đăng nhập lại.");
        logout();
        return Promise.reject(err);
      } finally {
        refreshingToken = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
