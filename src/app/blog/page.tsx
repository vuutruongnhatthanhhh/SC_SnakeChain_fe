"use client";
import React, { useState } from "react";
import Blogs from "@/components/Blogs";
import Search from "@/components/Search";
const BlogPage: React.FC = () => {
  const [filters, setFilters] = useState({
    courses: [],
    services: [],
    sourceCode: [],
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log("Selected Filters:", newFilters);
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const [checkboxes, setCheckboxes] = useState([
    { label: "Tất cả", checked: true },
    { label: "Tin tức", checked: false },
    { label: "Hữu ích", checked: false },
    { label: "Hướng dẫn", checked: false },
  ]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = checked;
    setCheckboxes(newCheckboxes);
  };
  const blogs = [
    {
      title: "Cách tối ưu SEO với Next.js",
      description: "Tối ưu thứ hạng tìm kiếm google",
      imageUrl: "/images/blogs/blog-nextjs.png",
      link: "/course/react",
    },
    {
      title: "Cách tối ưu SEO với Next.js 2",
      description: "Tối ưu thứ hạng tìm kiếm google",
      imageUrl: "/images/blogs/blog-nextjs.png",
      link: "/course/react",
    },
    {
      title: "Cách tối ưu SEO với Next.js 3",
      description: "Tối ưu thứ hạng tìm kiếm google",
      imageUrl: "/images/blogs/blog-nextjs.png",
      link: "/course/react",
    },
    {
      title: "Cách tối ưu SEO với Next.js 4",
      description: "Tối ưu thứ hạng tìm kiếm google",
      imageUrl: "/images/blogs/blog-nextjs.png",
      link: "/course/react",
    },
  ];
  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        <Search
          onSearch={handleSearch}
          checkboxes={checkboxes}
          onCheckboxChange={handleCheckboxChange}
        />
        <Blogs blogs={blogs} title="Blog" allBlogLink="#allBlog" />
      </div>
    </div>
  );
};

export default BlogPage;
