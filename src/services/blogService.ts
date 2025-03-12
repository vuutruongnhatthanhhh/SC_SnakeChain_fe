import api from "@/services/api";

export interface CreateBlogDto {
  title?: string;
  url?: string;
  image?: string;
  shortDescription?: string;
  content?: string;
  author?: string;
  isHide?: boolean;
}

export interface UpdateBlogDto {
  _id?: string;
  title?: string;
  url?: string;
  image?: string;
  shortDescription?: string;
  content?: string;
  author?: string;
  isHide?: boolean;
}

export const getAllBlogs = async (
  current: number,
  pageSize: number,
  searchTerm: string = "",
  isHide: boolean | string = ""
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

    const response = await api.get("/blogs", {
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

export const getAllBlogUser = async (searchTerm: string = ""): Promise<any> => {
  try {
    const params: Record<string, any> = {};

    if (searchTerm && searchTerm.trim() !== "") {
      params.query = searchTerm;
    }

    const response = await api.get("/blogs/userBlog", {
      params,
    });

    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getBlogUser = async (url: string): Promise<any> => {
  try {
    const response = await api.get(`/blogs/${url}`);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createBlog = async (data: CreateBlogDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.post("/blogs", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBlog = async (data: UpdateBlogDto): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.patch("/blogs", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id: string): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.delete(`/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (
  imageFile: File,
  folderName: string
): Promise<string> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await api.post(
      `/uploadImage?folderName=${folderName}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.data.data.success) {
      return response.data.data.imagePath;
    } else {
      throw new Error("Tải ảnh lên thất bại.");
    }
  } catch (error: any) {
    throw error;
  }
};

// export const uploadImages = async (imageFiles: File[]): Promise<string[]> => {
//   try {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       throw new Error("No access token found");
//     }

//     const formData = new FormData();
//     imageFiles.forEach((file, index) => {
//       formData.append("images", file);
//     });

//     const response = await api.post("/uploadImage/multiple", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (response.data.data.success) {
//       return response.data.data.imagePaths;
//     } else {
//       throw new Error("Tải ảnh lên thất bại.");
//     }
//   } catch (error: any) {
//     throw error;
//   }
// };

export const getUploadedImages = async (): Promise<string[]> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }
    const response = await api.get("/uploadImage/images", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.data.success) {
      return response.data.data.imagePaths;
    } else {
      throw new Error("Không thể lấy danh sách ảnh.");
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách ảnh:", error);
    return [];
  }
};

export const deleteUploadedImage = async (
  filename: string,
  folderName: string
): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await api.delete(`/uploadImage/${filename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { folderName },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
