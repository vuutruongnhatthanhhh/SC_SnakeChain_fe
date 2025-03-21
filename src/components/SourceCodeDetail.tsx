"use client";
import React, { useState } from "react";
import { FaYoutube, FaFileWord } from "react-icons/fa";
import { IoEarthOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

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
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER}${sourcecode.image}`}
          alt={sourcecode.title}
          width={800}
          height={400}
          className="object-contain rounded-lg"
        />
      </div>

      <div className="flex flex-col md:w-1/2 md:pl-6">
        <h1 className="text-xl font-bold text-black mb-2">
          {`[${sourcecode.code}] `}
          {sourcecode.title}
        </h1>
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
          <Link
            href={sourcecode.linkYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Xem demo dự án
          </Link>
        </div>

        <div className="flex items-center mt-4">
          <FaFileWord className="text-blue-600 mr-2" size={24} />
          <Link
            href={sourcecode.linkDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Tổng quan dự án
          </Link>
        </div>
        {sourcecode.linkWebsite && (
          <div className="flex items-center mt-4">
            <IoEarthOutline className="text-green-600 mr-2" size={24} />
            <Link
              href={sourcecode.linkWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline cursor-pointer"
            >
              Link xem thực tế
            </Link>
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
                  <Image
                    src={process.env.NEXT_PUBLIC_SERVER + image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={600}
                    height={400}
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
            <Image
              src={modalImage}
              alt="Modal Preview"
              className="max-h-[80vh] object-contain"
              width={600}
              height={400}
            />
          </div>
        </div>
      )}
      {/* Modal for Payment Info */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg w-96 ">
            <h2 className="text-xl font-bold mb-4 sticky top-0">
              Thông tin thanh toán
            </h2>
            <div className="flex-1 overflow-y-auto max-h-[70vh] px-1">
              <p>
                Vui lòng chuyển đúng số tiền{" "}
                <strong>{sourcecode.price.toLocaleString("vi-VN")}</strong> và
                nhập đúng nội dung chuyển khoản: email {sourcecode.code} (ví dụ:
                snakechain@gmail.com {sourcecode.code})
              </p>

              {/* QR Code */}
              <div className="flex justify-center mt-4">
                <a href="/images/qr_code.png" download="qr_code.png">
                  <Image
                    src="/images/qr_code.png"
                    alt="QR Code"
                    className="object-contain rounded-lg"
                    width={350}
                    height={350}
                  />
                </a>
              </div>

              <p className="mt-4 text-gray-600 text-sm">
                Vui lòng chờ trong khoảng <strong>12 giờ</strong> để chúng tôi
                chuyển source code + hướng dẫn cài đặt đến bạn qua email hoặc có
                thể liên hệ qua Zalo <strong>0911622262</strong>
              </p>
              <strong>Cảm ơn bạn đã ủng hộ Snake Chain! ❤️</strong>
            </div>
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
