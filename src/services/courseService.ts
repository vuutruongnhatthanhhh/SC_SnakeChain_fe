import api from "@/services/api";

export interface CreateCourseDto {
  title?: string;
  url?: string;
  image?: string;
  shortDescription?: string;
  category?: string;
  isHide?: boolean;
  lessons?: string[];
}

export interface UpdateCourseDto {
  _id?: string;
  title?: string;
  url?: string;
  image?: string;
  shortDescription?: string;
  category?: string;
  isHide?: boolean;
  lessons?: string[];
}

export const getAllCourse = async (
  current: number,
  pageSize: number,
  searchTerm: string = "",
  isHide: boolean | string = "",
  category: string = ""
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

    if (isHide !== "") {
      params.isHide = isHide.toString();
    }

    if (category && category.trim() !== "") {
      params.category = category;
    }

    const response = await api.get("/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getAllCourseUser = async (
  searchTerm: string = "",
  category: string = ""
): Promise<any> => {
  try {
    const params: Record<string, any> = {};

    if (searchTerm && searchTerm.trim() !== "") {
      params.query = searchTerm;
    }

    if (category && category.trim() !== "") {
      params.category = category;
    }

    const response = await api.get("/courses/userCourses", {
      params,
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createCourse = async (data: CreateCourseDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.post("/courses", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (data: UpdateCourseDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch("/courses", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseUser = async (url: string): Promise<any> => {
  try {
    const response = await api.get(`/courses/${url}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
