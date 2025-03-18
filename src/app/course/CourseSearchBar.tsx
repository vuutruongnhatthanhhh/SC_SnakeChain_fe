"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";

const CourseSearchBar: React.FC<{ searchTerm: string; category: string }> = ({
  searchTerm,
  category,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    setSearch(searchTerm);
    setSelectedCategory(category);
  }, [searchTerm, category]);

  const updateURL = (query: string, category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) params.set("query", query);
    else params.delete("query");

    if (category) params.set("category", category);
    else params.delete("category");

    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(() => {
      updateURL(value, selectedCategory);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedCategory(value);
    updateURL(search, value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        placeholder="Nhập tên khóa học..."
        className="border p-2 mb-4"
      />
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        options={[
          { value: "", label: "Tất cả" },
          { value: "WEBSITE", label: "Website" },
          { value: "BLOCKCHAIN", label: "Blockchain" },
          { value: "MOBILE", label: "Mobile" },
          { value: "SOFTWARE", label: "Software" },
        ]}
      />
    </div>
  );
};

export default CourseSearchBar;
