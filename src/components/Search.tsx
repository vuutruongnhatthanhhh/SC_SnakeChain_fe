import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearch: (query: string) => void; // Hàm callback để gửi từ khóa tìm kiếm lên component cha
  checkboxes: { label: string; checked: boolean }[]; // Các checkbox với nhãn và trạng thái checked
  onCheckboxChange: (index: number, checked: boolean) => void; // Hàm callback để cập nhật trạng thái của checkbox
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  checkboxes,
  onCheckboxChange,
}) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedState = !checkboxes[index].checked;
    onCheckboxChange(index, newCheckedState); // Cập nhật trạng thái checkbox
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
      {/* Input tìm kiếm */}
      <div className="">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Tìm kiếm..."
          className="p-3 border rounded-md w-full md:w-64"
        />
      </div>

      {/* Hiển thị các checkbox */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
        {checkboxes.map((checkbox, index) => (
          <label key={index} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={checkbox.checked}
              onChange={() => handleCheckboxChange(index)}
              className="form-checkbox"
            />
            <span>{checkbox.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Search;
