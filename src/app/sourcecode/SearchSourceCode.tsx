"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";

const SourceSearchBar: React.FC<{ searchTerm: string; field: string }> = ({
  searchTerm,
  field,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchTerm);
  const [selectedField, setSelectedField] = useState(field);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    setSearch(searchTerm);
    setSelectedField(field);
  }, [searchTerm, field]);

  const updateURL = (query: string, field: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (query) params.set("query", query);
    else params.delete("query");

    if (field) params.set("field", field);
    else params.delete("field");

    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    if (debounceTimeout) clearTimeout(debounceTimeout);

    const newTimeout = setTimeout(() => {
      updateURL(value, selectedField);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedField(value);
    updateURL(search, value);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        placeholder="Nhập tên hoặc mã..."
        className="border p-2 mb-4 mr-3"
      />
      <Select
        value={selectedField}
        onChange={handleFieldChange}
        options={[
          { value: "", label: "Tất cả" },
          { value: "FRONTEND", label: "Front-end" },
          { value: "BACKEND", label: "Back-end" },
          { value: "FULLSTACK", label: "Full-stack" },
          { value: "MOBILE", label: "Mobile" },
          { value: "BLOCKCHAIN", label: "Blockchain" },
        ]}
      />
    </div>
  );
};

export default SourceSearchBar;
