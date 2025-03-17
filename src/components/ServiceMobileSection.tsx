import React from "react";
import { FaCode, FaUser, FaTruck, FaMobileAlt } from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import config from "@/config";

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 px-8  pb-10">
      <h2 className="text-3xl font-semibold text-center mb-8">
        DỊCH VỤ THIẾT KẾ APP IOS & ANDROID
      </h2>
      <p className="text-center text-gray-700 mb-12">
        {config.companyName} cung cấp các giải pháp công nghệ tiên tiến, mang
        đến đầy đủ dịch vụ thiết kế ứng dụng di động giúp công việc trở nên dễ
        dàng và thuận tiện hợn
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard
          icon={<FaTruck />}
          title="Thiết kế ứng dụng quản lý"
          description="Ứng dụng quản lý lịch họp, quản lý tài liệu, quản lý sản xuất, quản lý giao hàng ..."
          link={"#"}
        />
        <ServiceCard
          icon={<FaUser />}
          title="Thiết kế ứng dụng cho doanh nghiệp"
          description="Ứng dụng kho xưởng, quản lý nhân sự, ứng dụng quản lý bán hàng ..."
          link={"#1"}
        />
        <ServiceCard
          icon={<FaMobileAlt />}
          title="Thiết kế ứng dụng theo yêu cầu"
          description="Thiết kế ứng dụng tùy chỉnh với giao diện và tính năng riêng biệt"
          link={"#2"}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
