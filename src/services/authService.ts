import axios from "axios";

export interface User {
  data(data: any): unknown;
  email: string;
  _id: string;
  name: string;
}

export interface LoginResponseData {
  data: any;
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  data: LoginResponseData;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface ChangePassRequest {
  code: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePassProfileRequest {
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  data: any;
  _id: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // if use HttpOnly cookie, turn on
});

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponseData>("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await api.post<{
      data: any;
      access_token: string;
    }>("/auth/refresh-token", {
      refresh_token: refreshToken,
    });

    localStorage.setItem("access_token", response.data.data.access_token);
    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

export const checkCode = async (email: string, code: string): Promise<void> => {
  await api.post("/auth/check-code", { email, code });
};

export const retryActive = async (email: string): Promise<void> => {
  await api.post("/auth/retry-active", { email });
};

export const retryPassword = async (email: string): Promise<void> => {
  await api.post("/auth/retry-password", { email });
};

export const changePassword = async (
  data: ChangePassRequest
): Promise<void> => {
  await api.post("/auth/change-password", data);
};

export const changePasswordProfile = async (
  data: ChangePassProfileRequest
): Promise<void> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No access token found");
  }
  await api.post("/auth/change-password-profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserInfo = async (id: string): Promise<User | null> => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.get<User>(`/auth/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return null;
  }
};
