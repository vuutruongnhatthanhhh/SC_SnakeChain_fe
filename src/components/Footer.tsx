import React, { useState, useEffect } from "react";
import { FaYoutube, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import config from "@/config";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 w-full ">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">{config.companyName}</h3>
          <p className="mb-2 text-gray-400">
            Điện thoại: {config.companyPhone}
          </p>
          <p className="mb-2 text-gray-400">
            Email:{" "}
            <a href="mailto:vuutruongnhatthanh@gmail.com" className="">
              {config.companyEmail}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Về {config.companyName}
          </h3>
          <ul>
            <li>
              <a href="/about" className="text-gray-400 hover:underline">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="/blog" className="text-gray-400 hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:underline">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Sản phẩm / Dịch vụ</h3>
          <ul>
            <li>
              <a href="/website" className="text-gray-400 hover:underline">
                Thiết kế website
              </a>
            </li>
            <li>
              <a href="/course" className="text-gray-400 hover:underline">
                Khóa học
              </a>
            </li>
            <li>
              <a href="/sourcecode" className="text-gray-400 hover:underline">
                Source Code
              </a>
            </li>
            <li>
              <a href="/price" className="text-gray-400 hover:underline">
                Bảng giá
              </a>
            </li>

            {/* <li>
              <a href="/mobile" className="text-gray-400 hover:underline">
                Xây dựng ứng dụng di động
              </a>
            </li> */}
            {/* <li>
              <a href="#" className="text-gray-400 hover:underline">
                Giải pháp Blockchain
              </a>
            </li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Lĩnh vực hoạt động</h3>
          <p className="mb-2 text-gray-400">{config.companyField}</p>
          <div className="mt-4 flex gap-4 justify-center sm:justify-start">
            <a
              href="https://www.youtube.com/@SnakeChain2801"
              target="_blank"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaYoutube className="h-6 w-6" />
            </a>
            <a
              href="https://www.facebook.com/people/Snake-Chain/61573199592592/"
              target="_blank"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
            {/* <a href="#" className="text-blue-400 hover:text-blue-500">
              <FaTiktok className="h-6 w-6" />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500">
              <FaInstagram className="h-6 w-6" />
            </a> */}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        <p>&copy; 2025 Bản quyền © {config.companyName} | Bảo lưu mọi quyền</p>
      </div>
    </footer>
  );
};

export default Footer;
