"use client";
import React from "react";
import {
  FaCogs,
  FaMobileAlt,
  FaHandshake,
  FaShareAlt,
  FaHeadset,
  FaLevelUpAlt,
} from "react-icons/fa"; // Import icons

import { LuNotebookText } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

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

const WhyAppSection: React.FC = () => {
  return (
    <section className="py-16 px-8 ">
      <h2 className="text-3xl font-semibold text-center mb-8">
        TẠI SAO BẠN NÊN CHỌN SNAKE CHAIN?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        <WhyCard
          icon={<FaLevelUpAlt className="text-4xl text-indigo-600" />}
          title="SNAKE CHAIN VỚI NHIỀU NĂM KINH NGHIỆM"
          description="Snake Chain với 5+ năm kinh nghiệm trong lĩnh vực thiết kế app, Snake Chain tự tin đáp ứng được nhu cầu thiết kế app của doanh nghiệp bạn. "
        />
        <WhyCard
          icon={<LuNotebookText className="text-4xl text-indigo-600" />}
          title="QUY TRÌNH THIẾT KẾ APP MINH BẠCH"
          description="Với quy trình thiết kế rõ ràng, minh bạch từ bước lập kế hoạch dự án, triển khai thiết kế, lập trình cho đến hoàn thiện dự án."
        />
        <WhyCard
          icon={
            <RiMoneyDollarCircleLine className="text-4xl text-indigo-600" />
          }
          title="CHI PHÍ HỢP LÝ"
          description="Hiểu được nhu cầu chi tiết của mỗi doanh nghiệp, Snake Chain sẽ đưa ra thông tin báo giá làm app hợp lý nhất cho từng doanh nghiệp."
        />
      </div>
    </section>
  );
};

export default WhyAppSection;
