import api from "@/services/api";

export interface CreateLessonDto {
  title?: string;
  content?: string;
  videoUrl?: string;
  price?: Number;
  isHide?: boolean;
  course?: string;
}

export interface UpdateLessonDto {
  _id?: string;
  title?: string;
  content?: string;
  videoUrl?: string;
  price?: Number;
  isHide?: boolean;
  course?: string;
}

export const getAllLessons = async (
  current: number,
  pageSize: number,
  searchTerm: string = "",
  isHide: boolean | string = "",
  course: string = ""
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

    if (course && course.trim() !== "") {
      params.course = course;
    }

    const response = await api.get("/lessons", {
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

export const createLesson = async (data: CreateLessonDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.post("/lessons", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLesson = async (data: UpdateLessonDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch("/lessons", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLesson = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.delete(`/lessons/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLessonsUser = async (id: string): Promise<any> => {
  try {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
