"use client";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa"; // Thêm các icon từ react-icons

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
      <div className="bg-indigo-100 rounded-full p-4 mb-4">
        <span className="text-2xl font-bold text-indigo-600">{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-sm text-center text-gray-600">{description}</p>
    </div>
  );
};

const ProcessAppSection: React.FC = () => {
  return (
    <section className="py-16 px-8 bg-gray-50 mb-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        QUY TRÌNH THIẾT KẾ APP MOBILE?
      </h2>
      <p className="text-center text-lg text-gray-700 mb-12">
        Quy trình làm việc của Snake Chain bao gồm 4 bước. Đảm bảo nắm bắt được
        yêu cầu, ý tưởng của khách hàng. Đưa ra sản phẩm thiết thực nhất.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProcessStep
          number={1}
          title="Lập kế hoạch dự án "
          description="Tiếp nhận thông tin dự án, trao đổi yêu cầu với khách hàng và lên lịch triển khai."
        />
        <ProcessStep
          number={2}
          title="Triển khai thiết kế"
          description="Bộ phận dự án sẽ tiến hành triển khai thiết kế giao diện UX/UI."
        />
        <ProcessStep
          number={3}
          title="Lập trình dự án"
          description="Sau khi thống nhất bản thiết kế dự án với khách hàng, bộ phận dự án bắt đầu lập trình dự án."
        />
        <ProcessStep
          number={4}
          title="Hoàn thiện dự án"
          description="Gửi dự án cho khách hàng, nhận feedback và tiến hành chỉnh sửa hoàn thiện dự án."
        />
      </div>
    </section>
  );
};

export default ProcessAppSection;
