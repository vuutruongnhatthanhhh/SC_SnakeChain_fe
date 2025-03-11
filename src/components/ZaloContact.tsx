"use client";
import { useState, useEffect, useRef } from "react";
import { SiZalo } from "react-icons/si";

interface Contact {
  name: string;
  phone: string;
  zaloLink: string;
}

export default function ZaloContact() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  // Danh sách người dùng Zalo
  const contacts: Contact[] = [
    {
      name: "Nhật Thanh",
      phone: "0911 622 262",
      zaloLink: "https://zalo.me/0911622262",
    },
    // {
    //   name: "Thiên Phúc",
    //   phone: "0963604877",
    //   zaloLink: "https://zalo.me/0963604877",
    // },
  ];

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
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 cursor-pointer shadow-lg hover:bg-blue-700 transition-all"
      >
        <SiZalo size={24} />
      </div>

      {isOpen && (
        <div
          ref={popupRef}
          className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg w-80 p-4 max-h-72 overflow-y-auto"
        >
          <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">
            Liên hệ Zalo
          </h3>
          <ul>
            {contacts.map((contact, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="text-gray-800">
                  <p>{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
                <a
                  href={contact.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Liên hệ
                </a>
              </li>
            ))}
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
