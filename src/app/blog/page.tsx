"use client";
import React, { useEffect, useState } from "react";
import Blogs from "@/components/Blogs";
import { getAllBlogUser } from "@/services/blogService";
import SearchInput from "@/components/SearchInput";
const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchBlogs = async (query: string) => {
    try {
      const data = await getAllBlogUser(query);
      setBlogs(data.data.results);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách blog:", error);
    }
  };

  useEffect(() => {
    if (searchTerm === "") {
      fetchBlogs("");
    }
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchBlogs(value);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên blog..."
          className="border p-2 mb-4 mr-3"
        />
        <Blogs blogs={blogs} title="" allBlogLink="#allBlog" />
      </div>
    </div>
  );
};

export default BlogPage;
