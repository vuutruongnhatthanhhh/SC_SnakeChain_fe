"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";

const Header: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isDropdownVisibleCourse, setDropdownVisibleCourse] =
    useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className=" sticky top-0 z-50 flex items-center justify-between p-4 text-white bg-gray-900">
      <div className="flex items-center space-x-2">
        <a href="/" rel="noopener noreferrer">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 cursor-pointer"
          />
        </a>
        <a href="/" rel="noopener noreferrer">
          <div className="text-xl font-semibold cursor-pointer">
            Snake Chain
          </div>
        </a>
      </div>

      <div
        className={`flex ${
          isMobile ? "space-x-2 justify-center" : "space-x-10"
        }`}
      >
        {!isMobile ? (
          <>
            <a href="/course" className="text-white hover:text-[#319795]">
              Khóa học
            </a>
            <div
              className="relative"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <a
                href="#dichvu"
                className="text-white hover:text-[#319795] flex items-center"
              >
                Dịch vụ
                <span className="ml-2" style={{ fontSize: "10px" }}>
                  ▼
                </span>
              </a>
              {isDropdownVisible && (
                <div className="absolute left-0 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10 flex-col w-64">
                  <a
                    href="#xaydungwebsite"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Bảng giá dịch vụ
                  </a>
                  <a
                    href="/website"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Thiết kế website
                  </a>
                  <a
                    href="/mobile"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Thiết kế ứng dụng di động
                  </a>
                  <a
                    href="#giaiphapblockchain"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Giải pháp blockchain
                  </a>
                </div>
              )}
            </div>

            <a href="/sourcecode" className="text-white hover:text-[#319795]">
              Source Code
            </a>
            <a href="#video" className="text-white hover:text-[#319795]">
              Video
            </a>
            <a href="#blog" className="text-white hover:text-[#319795]">
              Blog
            </a>
            <a href="#lienhe" className="text-white hover:text-[#319795]">
              Liên hệ
            </a>
          </>
        ) : (
          <p></p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {isMobile && (
          <button
            ref={toggleButtonRef}
            className="text-white"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            ☰
          </button>
        )}

        <button className="bg-[#319795] hover:bg-[#2C7A7B] text-white px-4 py-2 rounded-md">
          {isMobile ? (
            <span role="img" aria-label="user" className="text-white">
              <FaUser />
            </span>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </div>

      {isMobile && isDropdownVisible && (
        <div
          ref={menuRef}
          className="absolute top-16 right-4 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10 flex-col w-64"
        >
          <a
            href="#khoahoc"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Khóa học
          </a>
          <a
            href="#dichvu"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Thiết kế website
          </a>
          <a
            href="#dichvu"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Thiết kế ứng dụng di động
          </a>
          <a
            href="#dichvu"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Giải pháp Blockchain
          </a>
          <a
            href="#sourcecode"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Source Code
          </a>
          <a
            href="#video"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Video
          </a>
          <a
            href="#blog"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Blog
          </a>
          <a
            href="#lienhe"
            className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          >
            Liên hệ
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
