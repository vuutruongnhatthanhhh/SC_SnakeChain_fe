"use client";
import React, { useState } from "react";
import Courses from "@/components/Courses";
import Search from "@/components/Search";
export default function Course() {
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
    { label: "Front end", checked: false },
    { label: "Back end", checked: false },
    { label: "Databases", checked: false },
    { label: "Mobile", checked: false },
  ]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index].checked = checked;
    setCheckboxes(newCheckboxes);
  };

  const courses = [
    {
      title: "Khóa học lập trình React",
      description: "Học React từ cơ bản đến nâng cao",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/react",
    },
    {
      title: "Khóa học lập trình Node.js",
      description: "Lập trình backend với Node.js",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/nodejs",
    },
    {
      title: "Khóa học Python cho người mới bắt đầu",
      description: "Học Python dễ dàng với các bài tập thực hành",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/python",
    },
    {
      title: "Khóa học Machine Learning",
      description: "Khám phá thế giới học máy và AI",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/ml",
    },
    {
      title: "Khóa học Machine Learning 2",
      description: "Khám phá thế giới học máy và AI",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/ml",
    },
    {
      title: "Khóa học Machine Learning 3",
      description: "Khám phá thế giới học máy và AI",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/ml",
    },
    {
      title: "Khóa học Machine Learning 4",
      description: "Khám phá thế giới học máy và AI",
      imageUrl: "/images/courses/course-reactjs.png",
      link: "/course/ml",
    },
  ];
  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        {/* Hiển thị kết quả dựa trên filters */}
        {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
        <Search
          onSearch={handleSearch}
          checkboxes={checkboxes}
          onCheckboxChange={handleCheckboxChange}
        />
        <Courses
          courses={courses}
          title="Tất cả khóa học"
          allCoursesLink="#allcourse"
        />
      </div>
    </div>
  );
}
