import { useState, useEffect } from "react";
import {
  login,
  register,
  refreshAccessToken,
  checkCode,
} from "@/services/authService";

interface User {
  email: string;
  _id: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await login({ username, password });
      localStorage.setItem("access_token", response.data.access_token); // save access token to local storage
      localStorage.setItem("refresh_token", response.data.refresh_token); // save refresh token to local storage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
    } catch (error: any) {
      setLoading(false);
      throw error.response?.data?.message || "Lỗi không xác định";
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      setLoading(true);
      const response = await register({ email, password, name });
      return response.data._id;
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleLogout,
    handleRegister,
  };
};
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
