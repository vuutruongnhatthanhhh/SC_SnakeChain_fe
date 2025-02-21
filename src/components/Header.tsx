"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthForm from "./AuthForm";

const Header: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const pathname = usePathname();

  // Close dropdown when pathname changes
  useEffect(() => {
    setDropdownVisible(false);
  }, [pathname]);

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
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 text-white bg-gray-900">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-8 h-8 cursor-pointer"
          />
        </Link>
        <Link href="/">
          <div className="text-xl font-semibold cursor-pointer">
            Snake Chain
          </div>
        </Link>
      </div>

      <div
        className={`flex ${
          isMobile ? "space-x-2 justify-center" : "space-x-10"
        }`}
      >
        {!isMobile && (
          <>
            <Link href="/about" className="text-white hover:text-[#319795]">
              Giới thiệu
            </Link>
            <Link href="/course" className="text-white hover:text-[#319795]">
              Khóa học
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <Link
                href="#"
                className="text-white hover:text-[#319795] flex items-center"
              >
                Dịch vụ
                <span className="ml-2" style={{ fontSize: "10px" }}>
                  ▼
                </span>
              </Link>
              {isDropdownVisible && (
                <div className="absolute left-0 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10 flex-col w-64">
                  <Link
                    href="/price"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Bảng giá dịch vụ
                  </Link>
                  <Link
                    href="/website"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Thiết kế website
                  </Link>
                  <Link
                    href="/mobile"
                    className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
                  >
                    Thiết kế ứng dụng di động
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/sourcecode"
              className="text-white hover:text-[#319795]"
            >
              Source Code
            </Link>
            <Link href="/blog" className="text-white hover:text-[#319795]">
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-[#319795]">
              Liên hệ
            </Link>
          </>
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

        <button
          className="bg-[#319795] hover:bg-[#2C7A7B] text-white px-4 py-2 rounded-md"
          onClick={() => setIsAuthOpen(true)}
        >
          {isMobile ? (
            <span role="img" aria-label="user" className="text-white">
              <FaUser />
            </span>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </div>

      {/* Mobile menu with transition */}
      <div
        className={`fixed top-16 right-4 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10 transform transition-all duration-300 ${
          isMobile && isDropdownVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
        ref={menuRef}
      >
        <Link
          href="/about"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/about") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Giới thiệu
        </Link>
        <Link
          href="/course"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/course") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Khóa học
        </Link>
        <Link
          href="/website"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/website") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Thiết kế website
        </Link>
        <Link
          href="/mobile"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/mobile") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Thiết kế ứng dụng di động
        </Link>
        <Link
          href="/price"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/price") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Bảng giá dịch vụ
        </Link>
        {/* <Link
          href="#"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "#") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Giải pháp Blockchain
        </Link> */}
        <Link
          href="/sourcecode"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/sourcecode") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Source Code
        </Link>
        <Link
          href="/blog"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/blog") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Blog
        </Link>
        <Link
          href="/contact"
          className="block px-6 py-3 hover:bg-[#319795] transition-colors duration-300"
          onClick={(e) => {
            if (pathname === "/contact") {
              e.preventDefault();
              setDropdownVisible(false);
            }
          }}
        >
          Liên hệ
        </Link>
      </div>

      {/* Auth Modal */}
      {isAuthOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAuthOpen(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500"
            >
              ✕
            </button>
            <div className="w-full">
              <AuthForm />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
