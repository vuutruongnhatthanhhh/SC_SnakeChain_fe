import axios from "axios";

// Define types
export interface UpdateUserDto {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export interface CreateUserDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

export const countUsers = async (): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.get("/users/count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return { totalUsers: error };
  }
};

// export const getAllUsers = async (
//   current: number,
//   pageSize: number
// ): Promise<any> => {
//   try {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       throw new Error("No access token found");
//     }

//     const response = await api.get("/users", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         current,
//         pageSize,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     return { allUsers: error };
//   }
// };

export const getAllUsers = async (
  current: number,
  pageSize: number,
  searchTerm: string = ""
): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const params: Record<string, any> = {
      current,
      pageSize,
    };

    if (searchTerm && searchTerm.trim() !== "") {
      params.query = searchTerm;
    }

    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error };
  }
};

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
    throw error;
  }
};

export const updateUser = async (data: UpdateUserDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch("/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (data: CreateUserDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.post("/users", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
