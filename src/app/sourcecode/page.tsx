"use client";
import React, { useState, useEffect } from "react";
import SourceCode from "@/components/SourceCode";
import { getAllSourceCodeUser } from "@/services/sourceCodeService";
import SearchInput from "@/components/SearchInput";
import Select from "@/components/Select";

export default function Source() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [field, setField] = useState<string>("");
  const [sourceCodes, setSourceCodes] = useState<any[]>([]);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchSourceCodes(value, field);
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setField(value);

    fetchSourceCodes(searchTerm, value);
  };

  const fetchSourceCodes = async (query: string, field: string) => {
    try {
      const response = await getAllSourceCodeUser(query, field);
      setSourceCodes(response.data.results);
    } catch (error) {
      console.error("Error fetching source codes:", error);
    }
  };

  useEffect(() => {
    if (searchTerm === "" && field === "") {
      fetchSourceCodes("", "");
    }
  }, []);

  return (
    <div className="flex p-4 w-full">
      <div className="w-full">
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Nhập tên hoặc mã..."
          className="border p-2 mb-4 mr-3"
        />

        <Select
          value={field}
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

        <SourceCode codes={sourceCodes} title="" allCodeLink="#allcourse" />
      </div>
    </div>
  );
}
