import axios from "axios";

// Define types
export interface UpdateUserDto {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export const updateUserProfile = async (data: UpdateUserDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch("/users/updateProfile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    throw error;
  }
};
