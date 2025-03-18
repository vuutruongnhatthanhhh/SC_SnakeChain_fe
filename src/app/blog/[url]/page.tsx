import React from "react";
import BlogDetail from "@/components/BlogDetail";
import { getAllBlogUser, getBlogUser } from "@/services/blogService";
import Blogs from "@/components/Blogs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { baseOpenGraph } from "@/app/shared-metadata";

interface BlogDetailPageProps {
  params: { url: string };
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  try {
    const blogResponse = await getBlogUser(params.url);

    if (!blogResponse?.data) {
      return {
        title: "Bài viết không tồn tại",
        description: "Bài viết không tồn tại hoặc đã bị xóa.",
      };
    }

    const url = process.env.NEXT_PUBLIC_URL + "/blog/" + params.url;
    const urlImage = process.env.NEXT_PUBLIC_SERVER + blogResponse.data.image;

    return {
      title: {
        absolute: `${blogResponse.data.title}`,
      },
      description: `${blogResponse.data.shortDescription}`,
      openGraph: {
        ...baseOpenGraph,
        title: `${blogResponse.data.title}`,
        description: `${blogResponse.data.shortDescription}`,
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
      title: "Lỗi khi tải bài viết",
      description: "Có lỗi xảy ra khi tải bài viết.",
    };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { url } = params;

  try {
    const blogResponse = await getBlogUser(url);
    const relatedBlogsResponse = await getAllBlogUser("");

    if (!blogResponse?.data) {
      notFound();
    }

    return (
      <>
        <BlogDetail blog={blogResponse.data} />
        <Blogs
          blogs={relatedBlogsResponse.data.results.slice(0, 4)}
          title="Các bài viết nổi bật"
          allBlogLink="/blog"
        />
      </>
    );
  } catch (error) {
    notFound();
  }
}
