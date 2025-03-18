import React from "react";
import ServicesWebSection from "@/components/ServiceWebSection";
import WebCard from "@/components/WebCard";
import WhyWebSection from "@/components/WhyWebSection";
import ProcessWebSection from "@/components/ProcessWebSection";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/website";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  description:
    "Dịch vụ thiết kế website chuyên nghiệp giá rẻ tại Snake Chain – giao diện đẹp, tối ưu SEO, tốc độ nhanh, giá cả hợp lý, giúp doanh nghiệp phát triển bền vững",
  openGraph: {
    ...baseOpenGraph,
    url: url,
    siteName: "Snake Chain",
    images: [
      {
        url: urlImage,
        // width: 800,
        // height: 600,
      },
    ],
  },
  alternates: {
    canonical: url,
  },
};

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
      title: "Mẫu website Spa, thẩm mỹ viện",
      imageUrl: "/images/web/thiet-ke-website-spa-tham-my-vien.jpg",
    },
    {
      title: "Mẫu website công ty đồng phục, xưởng may mặc",
      imageUrl:
        "/images/web/thiet-ke-website-cong-ty-dong-phuc-xuong-may-mac.jpg",
    },
    {
      title: "Mẫu website bán trà sữa",
      imageUrl: "/images/web/thiet-ke-website-quan-tra-sua-ban-tra-sua.jpg",
    },
    {
      title: "Mẫu website dịch vụ thú y",
      imageUrl: "/images/web/thiet-ke-website-dich-vu-thu-y.jpg",
    },
    {
      title: "Mẫu website siêu thị mini",
      imageUrl: "/images/web/thiet-ke-website-sieu-thi-mini.jpg",
    },
    {
      title: "Mẫu website bán đồ nội thất",
      imageUrl:
        "/images/web/thiet-ke-website-ban-hang-noi-that-ban-do-noi-that.jpg",
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
      {/* <div className="text-center mt-8">
        <Link
          href={"#"}
          className="inline-block px-4 py-2 rounded-lg font-semibold bg-buttonRoot"
        >
          Xem tất cả
        </Link>
      </div> */}
      <WhyWebSection />
      <ProcessWebSection />
      <QuoteRequestForm />
    </>
  );
};

export default Page;
