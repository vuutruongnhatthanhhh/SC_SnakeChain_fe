import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearch: (query: string) => void;
  checkboxes: { label: string; checked: boolean }[];
  onCheckboxChange: (index: number, checked: boolean) => void;
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  checkboxes,
  onCheckboxChange,
}) => {
  const [query, setQuery] = useState<string>("");
  const [clientCheckboxes, setClientCheckboxes] = useState(checkboxes);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // setIsClient(true);
    setClientCheckboxes(checkboxes);
  }, [checkboxes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleCheckboxChange = (index: number) => {
    const newCheckedState = !clientCheckboxes[index].checked;
    onCheckboxChange(index, newCheckedState);
    const updatedCheckboxes = [...clientCheckboxes];
    updatedCheckboxes[index].checked = newCheckedState;
    setClientCheckboxes(updatedCheckboxes);
  };

  // if (!isClient) {
  //   return null;
  // }

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
      <div className="">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Tìm kiếm..."
          className="p-3 border rounded-md w-full md:w-64"
        />
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
        {clientCheckboxes.map((checkbox, index) => (
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
