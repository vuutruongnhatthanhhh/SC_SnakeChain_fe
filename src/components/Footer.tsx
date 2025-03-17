import React, { useState, useEffect } from "react";
import { FaYoutube, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import config from "@/config";
import Link from "next/link";

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
            <Link href="mailto:vuutruongnhatthanh@gmail.com" className="">
              {config.companyEmail}
            </Link>
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Về {config.companyName}
          </h3>
          <ul>
            <li>
              <Link href="/about" className="text-gray-400 hover:underline">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-400 hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:underline">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Sản phẩm / Dịch vụ</h3>
          <ul>
            <li>
              <Link href="/website" className="text-gray-400 hover:underline">
                Thiết kế website
              </Link>
            </li>
            <li>
              <Link href="/course" className="text-gray-400 hover:underline">
                Khóa học
              </Link>
            </li>
            <li>
              <Link
                href="/sourcecode"
                className="text-gray-400 hover:underline"
              >
                Source Code
              </Link>
            </li>
            <li>
              <Link href="/price" className="text-gray-400 hover:underline">
                Bảng giá
              </Link>
            </li>

            {/* <li>
              <Link href="/mobile" className="text-gray-400 hover:underline">
                Xây dựng ứng dụng di động
              </Link>
            </li> */}
            {/* <li>
              <Link href="#" className="text-gray-400 hover:underline">
                Giải pháp Blockchain
              </Link>
            </li> */}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Lĩnh vực hoạt động</h3>
          <p className="mb-2 text-gray-400">{config.companyField}</p>
          <div className="mt-4 flex gap-4 justify-center sm:justify-start">
            <Link
              href="https://www.youtube.com/@SnakeChain2801"
              target="_blank"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaYoutube className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.facebook.com/people/Snake-Chain/61573199592592/"
              target="_blank"
              className="text-blue-400 hover:text-blue-500"
            >
              <FaFacebook className="h-6 w-6" />
            </Link>
            {/* <Link href="#" className="text-blue-400 hover:text-blue-500">
              <FaTiktok className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-blue-400 hover:text-blue-500">
              <FaInstagram className="h-6 w-6" />
            </Link> */}
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
