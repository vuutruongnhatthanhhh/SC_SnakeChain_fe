"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { login } from "@/services/authService";
import { refreshAccessToken } from "@/services/authService";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  _id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        console.log("Missing access_token or refresh_token. Logging out...");
        logoutUser();
        return;
      }

      try {
        const decodedRefreshToken: any = jwtDecode(refreshToken);
        const currentTime = Date.now() / 1000;

        if (decodedRefreshToken.exp < currentTime) {
          console.log("Refresh token expired. Logging out...");
          logoutUser();
          return;
        }

        if (accessToken) {
          try {
            const decodedAccessToken: any = jwtDecode(accessToken);

            if (decodedAccessToken.exp < currentTime) {
              console.log("Access token expired, refreshing...");
              await refreshAccessToken();
            } else {
              console.log("Access token is still valid");
            }
          } catch (error) {
            console.error("Invalid access token:", error);
            logoutUser();
          }
        }
      } catch (error) {
        console.error("Invalid refresh token:", error);
        logoutUser();
      }
    };

    checkAndRefreshToken();
  }, []);

  //   const loginUser = async (email: string, password: string) => {
  //     try {
  //       const response = await login({ username: email, password });

  //       console.log("loginUser - user:", response.data.user);

  //       localStorage.setItem("access_token", response.data.access_token);
  //       localStorage.setItem("refresh_token", response.data.refresh_token);
  //       localStorage.setItem("user", JSON.stringify(response.data.user));

  //       setUser({ ...response.data.user });
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //     }
  //   };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
