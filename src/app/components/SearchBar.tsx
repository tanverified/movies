import React from 'react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 px-4">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-6 py-3 bg-[#2A2D37] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </form>
  );
};
