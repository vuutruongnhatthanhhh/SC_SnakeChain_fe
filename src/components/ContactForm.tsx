"use client";
import { sendContactRequest } from "@/services/mailService";
import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await sendContactRequest(formData);
      alert(response.data.message);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert("Gửi yêu cầu báo giá thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 text-center md:text-left">
          <h1 className="text-4xl font-bold mt-2">Liên hệ ngay!</h1>
          <h2 className="text-gray-600 mt-4">
            <Link
              href="mailto:vuutruongnhatthanh@gmail.com"
              className="text-blue-600 hover:underline"
            >
              vuutruongnhatthanh@gmail.com
            </Link>
          </h2>
          <h2 className="text-gray-600 mt-1">0911 622 262</h2>
        </div>

        {/* Right Section - Contact Form */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-lg mt-8 md:mt-0 max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Họ tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  maxLength={50}
                  onChange={handleChange}
                  placeholder="Họ tên"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  maxLength={11}
                  onChange={handleChange}
                  placeholder="Số điện thoại"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                  pattern="[0-9]{10,11}"
                  title="Số điện thoại không hợp lệ"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                maxLength={50}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Nội dung
              </label>
              <textarea
                name="message"
                value={formData.message}
                maxLength={200}
                onChange={handleChange}
                placeholder="Nội dung tin nhắn..."
                rows={4}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className={`w-full p-3 font-semibold rounded-md bg-buttonRoot transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
