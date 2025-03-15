import api from "@/services/api";

export const uploadVideo = async (file: File): Promise<string> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/video/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.filePath;
  } catch (error: any) {
    throw error;
  }
};
