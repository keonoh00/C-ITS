"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  onSearch,
  placeholder = "Search...",
}: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  const handleButtonClick = () => {
    onSearch(value);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="p-2 w-120 border border-neutral-500 text-neutral-300 rounded-sm bg-base-800"
      />
      <button className="p-2" onClick={handleButtonClick}>
        <Search size={18} className="text-neutral-400" />
      </button>
    </div>
  );
}
