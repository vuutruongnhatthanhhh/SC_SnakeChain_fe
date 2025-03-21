import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "Tìm kiếm...",
  className = "border p-2 mb-4",
}) => {
  return (
    <input
      type="text"
      value={value}
      maxLength={50}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
