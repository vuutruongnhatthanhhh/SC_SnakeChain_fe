"use client";
import React, { useState } from "react";
import { FaYoutube, FaFileWord } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";

interface SourceCode {
  code: string;
  title: string;
  stack: string;
  field: string;
  description: string;
  extendedDescription?: string;
  price: number;
  originalPrice: number;
  image: string;
  extendedImage?: string[];
  linkDoc: string;
  linkYoutube: string;
  linkWebsite: string;
}

interface SourceCodeDetailProps {
  sourcecode: SourceCode;
}

const SourceCodeDetail: React.FC<SourceCodeDetailProps> = ({ sourcecode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg ">
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <img
          src={process.env.NEXT_PUBLIC_SERVER + sourcecode.image}
          alt={sourcecode.title}
          className="w-auto h-auto object-fit rounded-lg"
        />
      </div>

      <div className="flex flex-col md:w-1/2 md:pl-6">
        <h2 className="text-xl font-bold text-black mb-2">
          {`[${sourcecode.code}] `}
          {sourcecode.title}
        </h2>
        <p className="text-gray-600 mb-4">{sourcecode.description}</p>

        <div className="flex items-center mb-4">
          <span className="text-2xl font-semibold text-red-600">
            {sourcecode.price.toLocaleString("vi-VN")}đ
          </span>
          <span className="text-lg text-gray-500 line-through ml-2">
            {sourcecode.originalPrice.toLocaleString("vi-VN")}đ
          </span>
          {sourcecode.originalPrice > 0 &&
            sourcecode.price < sourcecode.originalPrice && (
              <span className="text-xs text-white bg-green-500 rounded-full px-2 ml-2">
                -
                {(
                  (1 - sourcecode.price / sourcecode.originalPrice) *
                  100
                ).toFixed(0)}
                %
              </span>
            )}
        </div>

        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="w-1/2 mt-auto py-2 px-6 rounded-lg transition duration-200 bg-buttonRoot"
        >
          Mua ngay
        </button>

        <div className="flex items-center mt-4">
          <FaYoutube className="text-red-600 mr-2" size={24} />
          <a
            href={sourcecode.linkYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Xem demo dự án
          </a>
        </div>

        <div className="flex items-center mt-4">
          <FaFileWord className="text-blue-600 mr-2" size={24} />
          <a
            href={sourcecode.linkDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Tổng quan dự án
          </a>
        </div>
        {sourcecode.linkWebsite && (
          <div className="flex items-center mt-4">
            <IoEarthOutline className="text-green-600 mr-2" size={24} />
            <a
              href={sourcecode.linkWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline cursor-pointer"
            >
              Link xem thực tế
            </a>
          </div>
        )}

        <div className="mt-6 text-gray-700">
          <h3 className="text-lg font-semibold mb-2">Mô tả thêm</h3>
          <p>{sourcecode.extendedDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {sourcecode.extendedImage &&
              sourcecode.extendedImage.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() =>
                    openModal(process.env.NEXT_PUBLIC_SERVER + image)
                  }
                >
                  <img
                    src={process.env.NEXT_PUBLIC_SERVER + image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

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
      {/* Modal for Payment Info */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-96 ">
            <h2 className="text-xl font-bold mb-4">Thông tin thanh toán</h2>
            <p>
              Vui lòng chuyển đúng số tiền{" "}
              <strong>{sourcecode.price.toLocaleString("vi-VN")}</strong> và
              nhập đúng nội dung chuyển khoản: email {sourcecode.code} (ví dụ:
              snakechain@gmail.com {sourcecode.code})
            </p>

            {/* QR Code */}
            <div className="flex justify-center mt-4">
              <a href="/images/qr_code_2.png" download="qr_code.png">
                <img
                  src="/images/qr_code.png"
                  alt="QR Code"
                  className="w-70 h-70 object-contain rounded-lg"
                />
              </a>
            </div>

            <p className="mt-4 text-gray-600 text-sm">
              Vui lòng chờ trong khoảng <strong>12h</strong> để chúng tôi chuyển
              source code + hướng dẫn cài đặt đến bạn qua email hoặc có thể liên
              hệ qua Zalo <strong>0911 622 262</strong>
            </p>

            <button
              onClick={() => setIsPaymentModalOpen(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-center"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceCodeDetail;
