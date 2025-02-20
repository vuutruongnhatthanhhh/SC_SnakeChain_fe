import React from "react";
import ServicesWebSection from "@/components/ServiceWebSection";
import WebCard from "@/components/WebCard";
import WhyWebSection from "@/components/WhyWebSection";
import ProcessSection from "@/components/ProcessSection";
import QuoteRequestForm from "@/components/QuoteRequestForm";

const Page: React.FC = () => {
  const images = [
    {
      title: "Mẫu website Bán loa Audio",
      imageUrl:
        "/images/web/thiet-ke-website-ban-loa-ban-thiet-bi-am-thanh-audio-02.png",
    },
    {
      title: "Mẫu website Công ty Luật",
      imageUrl:
        "/images/web/thiet-ke-website-cong-ty-luat-su-van-phong-luat-su-tu-van-luat-03.jpg",
    },
    {
      title: "Mẫu website Khoan Cắt Bê Tông",
      imageUrl:
        "/images/web/thiet-ke-website-cong-ty-khoan-cat-ep-coc-do-be-tong-01.jpg",
    },
    {
      title: "Mẫu website Bán loa Audio",
      imageUrl:
        "/images/web/thiet-ke-website-ban-loa-ban-thiet-bi-am-thanh-audio-02.png",
    },
    {
      title: "Mẫu website Công ty Luật",
      imageUrl:
        "/images/web/thiet-ke-website-cong-ty-luat-su-van-phong-luat-su-tu-van-luat-03.jpg",
    },
    {
      title: "Mẫu website Khoan Cắt Bê Tông",
      imageUrl:
        "/images/web/thiet-ke-website-cong-ty-khoan-cat-ep-coc-do-be-tong-01.jpg",
    },
  ];
  return (
    <>
      <ServicesWebSection />

      <h2 className="text-3xl font-semibold text-center mb-8 pt-10">
        CÁC MẪU WEBSITE THAM KHẢO
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {images.map((image, index) => (
          <WebCard key={index} title={image.title} imageUrl={image.imageUrl} />
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href={"#"}
          className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700"
        >
          Xem tất cả
        </a>
      </div>
      <WhyWebSection />
      <ProcessSection />
      <QuoteRequestForm />
    </>
  );
};

export default Page;
