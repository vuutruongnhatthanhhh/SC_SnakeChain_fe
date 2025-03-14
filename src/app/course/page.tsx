"use client";
import React, { useEffect, useState } from "react";
import Courses from "@/components/Courses";
import Search from "@/components/Search";
import { getAllCourseUser } from "@/services/courseService";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";
export default function Course() {
  const [filters, setFilters] = useState({
    courses: [],
    services: [],
    sourceCode: [],
  });
  const [courses, setCourses] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setCategory(value);

    fetchCourse(searchTerm, value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchCourse(value, category);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const fetchCourse = async (query: string, category: string) => {
    try {
      const response = await getAllCourseUser(query, category);
      setCourses(response.data.results);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    if (searchTerm === "" && category === "") {
      fetchCourse("", "");
    }
  }, []);

  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        {/* Hiển thị kết quả dựa trên filters */}
        {/* <pre>{JSON.stringify(filters, null, 2)}</pre> */}
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên khóa học..."
          className="border p-2 mb-4 mr-3"
        />
        <Select
          value={category}
          onChange={handleCategoryChange}
          options={[
            { value: "", label: "Tất cả" },
            { value: "WEBSITE", label: "Website" },
            { value: "BLOCKCHAIN", label: "Blockchain" },
            { value: "MOBILE", label: "Mobile" },
            { value: "SOFTWARE", label: "Software" },
          ]}
        />
        <Courses courses={courses} title="" allCoursesLink="#allcourse" />
      </div>
    </div>
  );
}
