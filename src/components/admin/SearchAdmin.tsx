"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchAdminProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchAdmin = ({
  onSearch,
  placeholder = "Tìm kiếm...",
  initialValue = "",
}: SearchAdminProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center mb-4">
      <div className="relative flex-grow max-w-md">
        <input
          type="text"
          className="w-full p-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {searchTerm && (
          <button
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FiX size={16} />
          </button>
        )}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
          onClick={handleSearch}
          aria-label="Search"
        >
          <FiSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default SearchAdmin;
