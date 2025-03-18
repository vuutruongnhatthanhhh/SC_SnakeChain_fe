import React from "react";
import About from "@/components/About";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/about";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Giới thiệu về chúng tôi",
  description:
    "Giới thiệu về Snake Chain – nền tảng cung cấp dịch vụ thiết kế website chuyên nghiệp giá rẻ, đào tạo lập trình và giải pháp blockchain, giúp cá nhân & doanh nghiệp phát triển bền vững",
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

const AboutPage: React.FC = () => {
  return <About />;
};

export default AboutPage;
