import React from "react";
import { getAllBlogUser } from "@/services/blogService";
import Blogs from "@/components/Blogs";
import SearchBar from "./SearchBar";
import { Metadata } from "next";
import { baseOpenGraph } from "../shared-metadata";

const url = process.env.NEXT_PUBLIC_URL + "/blog";
const urlImage = process.env.NEXT_PUBLIC_URL + "/images/logo.png";

export const metadata: Metadata = {
  title: "Blog công nghệ và lập trình",
  description:
    "Blog Snake Chain chia sẻ kiến thức lập trình, thiết kế website, blockchain và công nghệ mới nhất, giúp bạn cập nhật xu hướng và nâng cao kỹ năng",
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

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const searchTerm = searchParams.query || "";
  const data = await getAllBlogUser(searchTerm);
  const blogs = data?.data?.results || [];

  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        <SearchBar searchTerm={searchTerm} />
        <Blogs blogs={blogs} title="" allBlogLink="#allBlog" />
      </div>
    </div>
  );
};

export default BlogPage;
