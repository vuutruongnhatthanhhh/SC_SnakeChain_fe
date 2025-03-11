import React from "react";
import Image from "next/image";
import config from "@/config";

const About: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-12">
          <Image
            src="/images/logo.png"
            alt={`${config.companyName} Logo`}
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>

        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          {config.companyName}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {config.companyName} chuyên cung cấp dịch vụ đào tạo lập trình và phát
          triển các giải pháp công nghệ, bao gồm thiết kế website và ứng dụng di
          động theo yêu cầu. Với đội ngũ chuyên gia giàu kinh nghiệm, chúng tôi
          cam kết mang đến những sản phẩm chất lượng và hiệu quả nhất cho khách
          hàng.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            {/* <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
              Sắp ra mắt
            </span> */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Mã nguồn dự án
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi cung cấp source code các dự án chuyên nghiệp, được thiết
              kế đẹp mắt, tối ưu hiệu suất và dễ dàng tùy chỉnh. Mỗi sản phẩm
              đều được xây dựng với tiêu chuẩn cao, đảm bảo chất lượng code
              sạch, logic chặt chẽ và có tài liệu hướng dẫn chi tiết, giúp bạn
              dễ dàng triển khai và mở rộng theo nhu cầu. Dù bạn là nhà phát
              triển, doanh nghiệp hay startup, chúng tôi đều có giải pháp phù
              hợp để giúp bạn tiết kiệm thời gian và tối ưu quy trình phát triển
              phần mềm.
            </p>
            <a
              href="/sourcecode"
              className="text-[#319795] hover:text-[#2C7A7B] font-semibold"
            >
              Xem thêm về mã nguồn dự án
            </a>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            {/* <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
              Sắp ra mắt
            </span> */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Thiết Kế Website
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi chuyên thiết kế website theo yêu cầu, mang đến giải pháp
              tối ưu và phù hợp nhất cho từng khách hàng. Dù bạn cần một trang
              web giới thiệu doanh nghiệp hay một nền tảng thương mại điện tử
              mạnh mẽ, chúng tôi luôn sẵn sàng biến ý tưởng của bạn thành hiện
              thực với giao diện đẹp, tốc độ nhanh và trải nghiệm người dùng tối
              ưu.
            </p>
            <a
              href="/website"
              className="text-[#319795] hover:text-[#2C7A7B] font-semibold"
            >
              Xem thêm về dịch vụ thiết kế website
            </a>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            {/* Nhãn "Sắp ra mắt" */}
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
              Sắp ra mắt
            </span>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Khóa học lập trình
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi cung cấp các khóa học lập trình từ cơ bản đến nâng cao.
              Các khóa học được thiết kế phù hợp với nhu cầu của học viên, từ
              lập trình web, app mobile đến phát triển phần mềm.
            </p>
            <a
              href="#"
              className="text-[#319795] hover:text-[#2C7A7B] font-semibold"
            >
              Xem thêm về khóa học
            </a>
          </div>

          <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
              Sắp ra mắt
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Thiết Kế Ứng Dụng Di Động
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi cung cấp dịch vụ phát triển ứng dụng di động cho các nền
              tảng iOS và Android, giúp bạn mang sản phẩm của mình đến gần hơn
              với người dùng.
            </p>
            <a
              href="#"
              className="text-[#319795] hover:text-[#2C7A7B] font-semibold"
            >
              Xem thêm về dịch vụ thiết kế ứng dụng di động
            </a>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
              Sắp ra mắt
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Giải pháp Blockchain
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi cung cấp các giải pháp Blockchain tiên tiến, giúp doanh
              nghiệp tối ưu hóa quy trình, nâng cao tính bảo mật và minh bạch
              trong giao dịch. Từ phát triển Smart Contract, xây dựng hệ thống
              DeFi đến triển khai Blockchain riêng, chúng tôi mang đến công nghệ
              đột phá, đảm bảo hiệu suất cao, an toàn và linh hoạt theo nhu cầu
              của bạn.
            </p>
            <a
              href="#"
              className="text-[#319795] hover:text-[#2C7A7B] font-semibold"
            >
              Xem thêm về giải pháp Blockchain
            </a>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md">
              Sắp ra mắt
            </span>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Phần mềm số hóa cho doanh nghiệp
            </h3>
            <p className="text-gray-600 mb-4">
              Chúng tôi cung cấp giải pháp số hóa toàn diện, giúp doanh nghiệp
              chuyển đổi từ quy trình thủ công sang hệ thống quản lý thông minh.
              Với công nghệ hiện đại, phần mềm của chúng tôi tối ưu hóa vận
              hành, nâng cao hiệu suất làm việc và giảm thiểu chi phí. Từ quản
              lý tài liệu, quy trình làm việc đến tự động hóa nghiệp vụ, chúng
              tôi giúp doanh nghiệp của bạn vận hành linh hoạt, hiệu quả và sẵn
              sàng bứt phá trong kỷ nguyên số.
            </p>
            <a
              href="#"
              className="text-[#319795] hover:text-[#2C7A7B] font-semibold"
            >
              Xem thêm về phần mềm số hóa cho doanh nghiệp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
