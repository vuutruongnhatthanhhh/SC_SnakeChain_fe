import React from "react";
import { getAllSourceCodeUser } from "@/services/sourceCodeService";
import SourceCode from "@/components/SourceCode";
import SourceSearchBar from "./SearchSourceCode";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/sourcecode";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Source code - Mã nguồn dự án",
  description:
    "Snake Chain cung cấp source code chất lượng, dễ mở rộng, tối ưu SEO và hiệu suất, giúp lập trình viên và doanh nghiệp triển khai dự án nhanh chóng",
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

const Source = async ({
  searchParams,
}: {
  searchParams: { query?: string; field?: string };
}) => {
  const searchTerm = searchParams.query || "";
  const field = searchParams.field || "";

  const data = await getAllSourceCodeUser(searchTerm, field);
  const sourceCodes = data?.data?.results || [];

  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        <SourceSearchBar searchTerm={searchTerm} field={field} />
        <SourceCode
          codes={sourceCodes}
          title="Kho source code đa dạng"
          allCodeLink="#allcourse"
        />
      </div>
    </div>
  );
};

export default Source;
