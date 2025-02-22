"use client";
import config from "@/config";
import React, { useState, useEffect } from "react";
import { FaYoutube, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  phone: string;
  budget: string;
  description: string;
}

const QuoteRequestForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    budget: "",
    description: "",
  });

  const [isClient, setIsClient] = useState(false); // Kiểm tra môi trường client

  useEffect(() => {
    setIsClient(true); // Set lại state khi component mount trên client
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  if (!isClient) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center bg-white p-8 rounded-2xl shadow-lg max-w-6xl w-full mx-auto mb-4">
      <div className="w-full lg:w-1/2 p-4 ">
        <h2 className="text-3xl font-bold mb-4">Yêu cầu báo giá</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ tên"
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="w-full p-3 border rounded-md"
            required
          />
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          >
            <option value="" disabled>
              Ngân sách
            </option>
            <option value="dưới 10 triệu">Dưới 10 triệu</option>
            <option value="10 - 30 triệu">10 - 30 triệu</option>
            <option value="30 - 50 triệu">30 - 50 triệu</option>
            <option value="trên 50 triệu">Trên 50 triệu</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mô tả dự án"
            className="w-full p-3 border rounded-md"
            rows={4}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-colors"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <h3 className="text-2xl font-semibold mb-4">
          Bạn cần thiết kế website, ứng dụng di động?
        </h3>
        <p className="mb-2">
          Liên hệ ngay với <strong>{config.companyName}</strong>
        </p>
        <p className="mb-2">
          <strong>Điện thoại:</strong> 0911 622 262
        </p>
        <p className="mb-2">
          <strong>Email:</strong> vuutruongnhatthanh@gmail.com
        </p>
        <div className="flex space-x-4 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            className="text-blue-600 hover:text-blue-700"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://t.me"
            target="_blank"
            className="text-blue-600 hover:text-blue-700"
          >
            <FaTiktok size={24} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="text-blue-600 hover:text-blue-700"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestForm;
