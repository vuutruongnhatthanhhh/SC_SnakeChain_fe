import React from "react";

interface Option {
  value: string;
  label: string;
}

interface FilterAdminProps {
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterAdmin: React.FC<FilterAdminProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <select className="p-2 border" value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterAdmin;
