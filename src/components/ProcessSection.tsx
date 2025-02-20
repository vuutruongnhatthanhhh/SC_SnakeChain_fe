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

const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 px-8 bg-gray-50 mb-12">
      <h2 className="text-3xl font-bold text-center mb-12">
        QUY TRÌNH LÀM VIỆC?
      </h2>
      <p className="text-center text-lg text-gray-700 mb-12">
        Quy trình làm việc của Snake Chain bao gồm 4 bước. Đảm bảo nắm bắt được
        yêu cầu, ý tưởng của khách hàng. Đưa ra sản phẩm thiết thực nhất.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProcessStep
          number={1}
          title="Phân tích, lập kế hoạch"
          description="Trao đổi để hiểu rõ hơn về mong muốn và kỳ vọng. Lập kế hoạch dự án, xác định rõ các bước, thời gian và nguồn lực cần thiết."
        />
        <ProcessStep
          number={2}
          title="Thiết kế và Phát triển"
          description="Thiết kế kiến trúc hệ thống, giao diện người dùng và các tính năng chính. Sử dụng các kỹ thuật phát triển như Agile hoặc Scrum."
        />
        <ProcessStep
          number={3}
          title="Kiểm tra, đảm bảo"
          description="Sau khi phần mềm hoàn thành, chúng tôi thực hiện kiểm tra để phát hiện và sửa lỗi."
        />
        <ProcessStep
          number={4}
          title="Triển khai và hỗ trợ"
          description="Triển khai lên môi trường thực tế. Đảm bảo rằng hệ thống hoạt động ổn định. Hỗ trợ liên tục để giải quyết bất kỳ vấn đề nào hoặc cải tiến."
        />
      </div>
    </section>
  );
};

export default ProcessSection;
