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
