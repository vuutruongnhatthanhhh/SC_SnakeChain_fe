"use client";
import React, { useEffect, useState } from "react";
import BlogDetail from "@/components/BlogDetail";
import { useParams } from "next/navigation";
import { getAllBlogUser, getBlogUser } from "@/services/blogService";
import Blogs from "@/components/Blogs";
const BlogDetailPage: React.FC = () => {
  const { url } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBlog = async () => {
    if (url) {
      try {
        const data = await getBlogUser(url as string);
        setBlog(data.data);
        setLoading(false);
      } catch (err: any) {
        setError("Không tìm thấy Blog hoặc có lỗi xảy ra.");
        setLoading(false);
      }
    }
  };

  const fetchRelatedBlogs = async (query: string) => {
    try {
      const data = await getAllBlogUser(query);
      setRelatedBlogs(data.data.results);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách blog:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchRelatedBlogs("");
  }, [url]);

  if (loading) return <div className="min-h-screen">Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <BlogDetail blog={blog} />
      <Blogs
        blogs={relatedBlogs.slice(0, 4)}
        title="Các bài viết nổi bật"
        allBlogLink="/blog"
      />
    </>
  );
};

export default BlogDetailPage;
