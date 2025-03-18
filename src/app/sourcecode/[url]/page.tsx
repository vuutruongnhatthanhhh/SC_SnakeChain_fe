import React from "react";
import { notFound } from "next/navigation";
import { getSourceCodeUser } from "@/services/sourceCodeService";
import SourceCodeDetail from "@/components/SourceCodeDetail";
import { baseOpenGraph } from "@/app/shared-metadata";

interface SourceCodeDetailPageProps {
  params: { url: string };
}

export async function generateMetadata({ params }: SourceCodeDetailPageProps) {
  try {
    const sourceCodeResponse = await getSourceCodeUser(params.url);

    if (!sourceCodeResponse?.data) {
      return {
        title: "Source Code không tồn tại",
        description: "Source Code không tồn tại hoặc đã bị xóa.",
      };
    }

    const url = process.env.NEXT_PUBLIC_URL + "/sourcecode/" + params.url;
    const urlImage =
      process.env.NEXT_PUBLIC_SERVER + sourceCodeResponse.data.image;

    return {
      title: {
        absolute: sourceCodeResponse.data.title,
      },
      description: sourceCodeResponse.data.stack,
      openGraph: {
        ...baseOpenGraph,
        title: `${sourceCodeResponse.data.title}`,
        description: `${sourceCodeResponse.data.stack}`,
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
  } catch (error) {
    return {
      title: "Lỗi khi tải Source Code",
      description: "Có lỗi xảy ra khi tải thông tin source code.",
    };
  }
}

export default async function SourceCodeDetailPage({
  params,
}: SourceCodeDetailPageProps) {
  try {
    const sourceCodeResponse = await getSourceCodeUser(params.url);

    if (!sourceCodeResponse?.data) {
      notFound();
    }

    return <SourceCodeDetail sourcecode={sourceCodeResponse.data} />;
  } catch (error) {
    notFound();
  }
}
