import React from "react";
import TablePricing from "@/components/TablePricing";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/price";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Bảng giá dịch vụ",
  description:
    "Snake Chain cung cấp bảng giá rõ ràng cho dịch vụ thiết kế website chuyên nghiệp. Cam kết chi phí hợp lý, minh bạch, phù hợp mọi nhu cầu",
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

const PricePage: React.FC = () => {
  return (
    <>
      <input
        type="text"
        autoFocus
        style={{ opacity: 0, position: "absolute" }}
      />
      <TablePricing />
    </>
  );
};

export default PricePage;
