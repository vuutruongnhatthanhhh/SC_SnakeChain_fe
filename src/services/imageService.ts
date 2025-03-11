import api from "@/services/api";

export const getAllImage = async (
  searchTerm: string = "",
  category: string = ""
): Promise<any> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const params: Record<string, any> = {};

    if (searchTerm && searchTerm.trim() !== "") {
      params.query = searchTerm;
    }

    if (category !== "") {
      params.category = category;
    }

    const response = await api.get("/images", {
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
