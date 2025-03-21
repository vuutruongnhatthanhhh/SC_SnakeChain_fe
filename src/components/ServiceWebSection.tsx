import React from "react";
import {
  FaShoppingCart,
  FaBuilding,
  FaCode,
  FaMobileAlt,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";
import config from "@/config";

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 px-8  pb-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        DỊCH VỤ THIẾT KẾ WEBSITE
      </h1>
      <p className="text-center text-gray-700 mb-12">
        {config.companyName} cung cấp những giải pháp công nghệ tiên tiến, mang
        đến đầy đủ dịch vụ thiết kế website giúp xây dựng thương hiệu online
        mạnh mẽ và thúc đẩy doanh thu vượt trội.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard
          icon={<FaShoppingCart />}
          title="Thiết kế website bán hàng"
          description={`Khám phá sự khác biệt vượt trội với công nghệ thiết kế website bán hàng chuẩn SEO Google từ ${config.companyName}, giúp đẩy mạnh doanh số bán hàng`}
          link={""}
        />
        <ServiceCard
          icon={<FaBuilding />}
          title="Thiết kế website doanh nghiệp"
          description={`Hãy trải nghiệm dịch vụ Thiết kế web doanh nghiệp chuẩn SEO từ ${config.companyName} để nâng tầm thương hiệu công ty bạn.`}
          link={""}
        />
        <ServiceCard
          icon={<FaCode />}
          title="Thiết kế website theo yêu cầu"
          description="Thiết kế website tùy chỉnh với giao diện và tính năng riêng biệt, bao gồm các dự án web code tay như website đặt tour, mạng xã hội, và nhiều hơn nữa."
          link={""}
        />
        {/* <ServiceCard
          icon={<FaMobileAlt />}
          title="Liên kết App điện thoại với website (IOS/Android)"
          description="Thiết kế ứng dụng di động + website đồng bộ với nhau với các tính năng gửi thông báo về điện thoại"
          link={"#3"}
        /> */}
      </div>
    </section>
  );
};

export default ServicesSection;
