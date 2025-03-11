import api from "@/services/api";

export interface CreateSourceCodeDto {
  code?: string;
  title?: string;
  url?: string;
  stack?: string;
  field?: string;
  description?: string;
  extendedDescription?: string;
  price?: Number;
  originalPrice?: Number;
  image?: string;
  extendedImage?: string[];
  linkDoc?: string;
  linkYoutube?: string;
  isHide?: boolean;
}

export interface UpdateSourceCodeDto {
  _id?: string;
  code?: string;
  title?: string;
  url?: string;
  stack?: string;
  field?: string;
  description?: string;
  extendedDescription?: string;
  price?: Number;
  originalPrice?: Number;
  image?: string;
  extendedImage?: string[];
  linkDoc?: string;
  linkYoutube?: string;
  isHide?: boolean;
}

export const getAllSourceCode = async (
  current: number,
  pageSize: number,
  searchTerm: string = "",
  isHide: boolean | string = "",
  field: string = ""
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

    if (field && field.trim() !== "") {
      params.field = field;
    }

    const response = await api.get("/sourcecode", {
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

export const getAllSourceCodeUser = async (
  searchTerm: string = "",
  field: string = ""
): Promise<any> => {
  try {
    const params: Record<string, any> = {};

    if (searchTerm && searchTerm.trim() !== "") {
      params.query = searchTerm;
    }

    if (field && field.trim() !== "") {
      params.field = field;
    }

    const response = await api.get("/sourcecode/userCode", {
      params,
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getSourceCodeUser = async (url: string): Promise<any> => {
  try {
    const response = await api.get(`/sourcecode/${url}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createSourceCode = async (
  data: CreateSourceCodeDto
): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.post("/sourcecode", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSourceCode = async (
  data: UpdateSourceCodeDto
): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch("/sourcecode", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSourceCode = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.delete(`/sourcecode/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imageFile: File): Promise<string> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post("/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.data.success) {
      return response.data.data.imagePath;
    } else {
      throw new Error("Tải ảnh lên thất bại.");
    }
  } catch (error: any) {
    throw error;
  }
};

export const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append("images", file);
    });

    const response = await api.post("/upload/multiple", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.data.success) {
      return response.data.data.imagePaths;
    } else {
      throw new Error("Tải ảnh lên thất bại.");
    }
  } catch (error: any) {
    throw error;
  }
};
