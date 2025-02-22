"use client";
import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "App Quản Lý Xưởng",
    description: "Cải thiện tiến độ sản xuất",
    image: "/images/mobile/app-quan-ly-xuong.png",
    link: "/app-quan-ly-xuong",
  },
  {
    id: 2,
    name: "App Quản Lý Spa",
    description: "Quản lý Booking Spa",
    image: "/images/mobile/app-quan-ly-spa.png",
    link: "/app-quan-ly-spa",
  },
  {
    id: 3,
    name: "App Quản Lý LATEX ONE",
    description: "Quản lý hoạt động sản xuất",
    image: "/images/mobile/app-quan-ly-latex-one.png",
    link: "/app-quan-ly-latex-one",
  },
  {
    id: 4,
    name: "App Quản Lý Nông Nghiệp",
    description: "Quản lý bán hàng nông nghiệp",
    image: "/images/mobile/app-quan-ly-nong-nghiep.png",
    link: "/app-quan-ly-nong-nghiep",
  },
  {
    id: 5,
    name: "App Quản Lý Book Xe",
    description: "Quản lý book xe và book tài xế",
    image: "/images/mobile/app-quan-ly-book-xe.png",
    link: "/app-quan-ly-book-xe",
  },
  {
    id: 6,
    name: "App Quản Lý Bán Hàng",
    description: "Quản lý chi tiết bán hàng",
    image: "/images/mobile/app-quan-ly-ban-hang.png",
    link: "/app-quan-ly-ban-hang",
  },
];

export default function MobileCard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 pt-10">
        CÁC ỨNG DỤNG THAM KHẢO
      </h2>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.link}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              {project.name}
            </h3>
            <p className="text-sm text-gray-500">{project.description}</p>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href={"#"}
          className="inline-block px-4 py-2 rounded-lg font-semibold bg-buttonRoot"
        >
          Xem tất cả
        </a>
      </div>
    </div>
  );
}
