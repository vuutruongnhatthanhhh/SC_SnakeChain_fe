import React from "react";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/contact";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Liên hệ với chúng tôi",
  description:
    "Liên hệ Snake Chain để được tư vấn thiết kế website, khóa học lập trình và giải pháp blockchain. Chúng tôi luôn sẵn sàng hỗ trợ bạn!",
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

const ContactPage: React.FC = () => {
  return (
    <>
      <ContactForm />
    </>
  );
};

export default ContactPage;
