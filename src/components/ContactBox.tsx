"use client";
import { useState, useEffect, useRef } from "react";
import { SiZalo } from "react-icons/si";
import { GrContact } from "react-icons/gr";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaFacebookMessenger,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface Contact {
  name: string;
  phone: string;
  zaloLink: string;
  email: string;
  address: string;
  messengerLink: string;
}

export default function ContactBox() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  // Danh sách người dùng Zalo
  const contact: Contact = {
    name: "Nhật Thanh",
    phone: "0911 622 262",
    zaloLink: "https://zalo.me/0911622262",
    email: "vuutruongnhatthanh@gmail.com",
    address: "20 Nguyễn Cơ Thạch, P. An Lợi Đông, TP Thủ Đức",
    messengerLink: "https://m.me/605190802668591",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !iconRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div
        ref={iconRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 bg-green-600 text-white rounded-full p-4 cursor-pointer shadow-lg hover:bg-green-700 transition-all animate-shake"
      >
        <GrContact size={24} />
      </div>

      {isOpen && (
        <div
          ref={popupRef}
          className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg w-80 p-4 max-h-72 overflow-y-auto"
        >
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
            Liên hệ với Snake Chain
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer">
              <SiZalo className="text-blue-500" size={20} />
              <a
                href={contact.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800"
              >
                Nhật Thanh
              </a>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer">
              <FaPhoneAlt className="text-green-500" size={20} />
              <span className="text-gray-800">{contact.phone}</span>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer">
              <FaFacebookMessenger className="text-blue-600" size={20} />
              <a
                href={contact.messengerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800"
              >
                Snake Chain
              </a>
            </li>
            <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer">
              <FaEnvelope className="text-red-500" size={20} />
              <span className="text-gray-800">{contact.email}</span>
            </li>
            {/* <li className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer">
              <FaMapMarkerAlt className="text-red-600" size={20} />
              <span className="text-gray-800">{contact.address}</span>
            </li> */}
          </ul>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}
