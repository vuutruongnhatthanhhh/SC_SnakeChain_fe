"use client";
import React from "react";
import {
  FaCogs,
  FaMobileAlt,
  FaHandshake,
  FaShareAlt,
  FaHeadset,
} from "react-icons/fa";

interface WhyCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const WhyCard: React.FC<WhyCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
      <div className="bg-indigo-100 rounded-full p-4 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-sm text-center text-gray-600">{description}</p>
    </div>
  );
};

const WhySection: React.FC = () => {
  return (
    <section className="py-16 px-8 ">
      <h2 className="text-3xl font-semibold text-center mb-8">
        TẠI SAO BẠN NÊN CHỌN SNAKE CHAIN?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        <WhyCard
          icon={<FaCogs className="text-4xl text-indigo-600" />}
          title="WEBSITE CHUẨN SEO"
          description="Snake Chain tối ưu website chuẩn SEO, mang đến cho khách hàng nền tảng vững chắc để vươn lên top các công cụ tìm kiếm, giúp phát triển bền vững trong tương lai."
        />
        <WhyCard
          icon={<FaMobileAlt className="text-4xl text-indigo-600" />}
          title="GIAO DIỆN RESPONSIVE"
          description="Giao diện tương thích trên PC, Laptop, Table, Mobile và tất cả các kích thước màn hình."
        />
        <WhyCard
          icon={<FaHandshake className="text-4xl text-indigo-600" />}
          title="GIAO DIỆN THÂN THIỆN"
          description="Xu hướng thân thiện với người dùng vẫn là yếu tố quan trọng nhất hiện nay mà Halo cung cấp cho khách hàng."
        />
        <WhyCard
          icon={<FaShareAlt className="text-4xl text-indigo-600" />}
          title="TÍCH HỢP MẠNG XÃ HỘI"
          description="Tích hợp các mạng xã hội vào ngay trong Website của bạn cho phép khách hàng dễ dàng liên lạc tương tác."
        />
        <WhyCard
          icon={<FaCogs className="text-4xl text-indigo-600" />}
          title="GIAO DIỆN QUẢN LÝ ĐƠN GIẢN"
          description="Để giúp cho khách hàng quản lý hiệu quả, Website tối ưu giao diện quản lý đơn giản, dễ dàng sử dụng."
        />
        <WhyCard
          icon={<FaHeadset className="text-4xl text-indigo-600" />}
          title="HỖ TRỢ TẬN TÌNH"
          description="Hỗ trợ tận tình là phương châm quan trọng nhất của Snake Chain, với chúng tôi phục vụ khách hàng tốt nhất là yếu tố giúp chúng tôi tồn tại và phát triển."
        />
      </div>
    </section>
  );
};

export default WhySection;
