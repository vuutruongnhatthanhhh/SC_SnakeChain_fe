"use client";
import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";

interface SourceCode {
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  discount: string;
  imageUrl: string;
  additionalDescription: string;
  images: string[];
  demoLink: string;
}

const product: SourceCode = {
  title: "Laravel Cloudinary Clone API PRO",
  description:
    "Giải pháp upload ảnh thay thế Cloudinary, nâng cấp một số tính năng, xử lý một số phần còn giới hạn bản thường.",
  price: "1,750,000đ",
  originalPrice: "3,000,000đ",
  discount: "-42%",
  imageUrl: "/images/courses/course-reactjs.png",
  additionalDescription:
    "Laravel Cloudinary Clone API là giải pháp lý tưởng để tối ưu và quản lý hình ảnh một cách dễ dàng. Tích hợp API này giúp bạn tiết kiệm thời gian, chi phí, và tăng cường khả năng xử lý hình ảnh linh hoạt hơn.",
  images: [
    "/images/sourcecode/code-demo.png",
    "/images/sourcecode/source-code.png",
    "/images/sourcecode/source-code.png",
  ],
  demoLink: "https://www.youtube.com/watch?v=example",
};

const SourceCodeDetail = () => {
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="flex flex-col md:flex-row  p-6 rounded-lg ">
      {/* Product Image */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col md:w-1/2 md:pl-6">
        <h2 className="text-xl font-bold text-black mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>

        {/* Price Section */}
        <div className="flex items-center mb-4">
          <span className="text-2xl font-semibold text-red-600">
            {product.price}
          </span>
          <span className="text-lg text-gray-500 line-through ml-2">
            {product.originalPrice}
          </span>
          <span className="text-xs text-white bg-green-500 rounded-full px-2 ml-2">
            {product.discount}
          </span>
        </div>

        <button className="w-1/2 mt-auto py-2 px-6 rounded-lg transition duration-200 bg-buttonRoot">
          Mua ngay
        </button>

        <div className="flex items-center mt-4">
          <FaYoutube className="text-red-600 mr-2" size={24} />
          <a
            href={product.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Xem demo source code
          </a>
        </div>

        <div className="mt-6 text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Mô tả thêm</h3>
          <p>{product.additionalDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openModal(image)} // Open modal on click
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Image Preview */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded-lg">
            <span
              className="absolute top-2 right-2 text-white text-xl cursor-pointer"
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              src={modalImage}
              alt="Modal Preview"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceCodeDetail;
