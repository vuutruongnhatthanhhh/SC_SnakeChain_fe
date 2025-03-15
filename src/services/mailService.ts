import api from "@/services/api";

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  budget: string;
  description: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendQuoteRequest = async (data: QuoteRequest): Promise<any> => {
  try {
    const response = await api.post("/mail/quoteRequest", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    throw error;
  }
};

export const sendContactRequest = async (
  data: ContactRequest
): Promise<any> => {
  try {
    const response = await api.post("/mail/contactRequest", data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    throw error;
  }
};
