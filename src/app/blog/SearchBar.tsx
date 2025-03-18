"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";

const SearchBar: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue !== searchTerm) {
        router.push(`?query=${inputValue}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [inputValue, searchTerm, router]);

  return (
    <SearchInput
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Nhập tên blog..."
      className="border p-2 mb-4 mr-3"
    />
  );
};

export default SearchBar;
