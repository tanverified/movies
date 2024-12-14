import React, { useState } from "react";
import { FilterOptions, SortCriteria, SortDirection } from "@/types/filters";
import { FaSort, FaFilter, FaCalendar, FaStar } from "react-icons/fa";

interface Genre {
  id: number;
  name: string;
}
interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  genres: Genre[];
}

export const FilterBar = ({ onFilterChange, genres }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "popularity",
    sortDirection: "desc",
    minRating: 0,
  });

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Filters
        </h2>

        {/* Sort Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400">
            <FaSort />
            <h3 className="font-medium">Sort</h3>
          </div>
          <select
            className="w-full bg-[#1A1D29] px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 transition-colors"
            onChange={(e) =>
              handleFilterChange({ sortBy: e.target.value as SortCriteria })
            }
            value={filters.sortBy}
          >
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
            <option value="vote_average">Rating</option>
            <option value="title">Title</option>
          </select>
          <select
            className="w-full bg-[#1A1D29] px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 transition-colors"
            onChange={(e) =>
              handleFilterChange({
                sortDirection: e.target.value as SortDirection,
              })
            }
            value={filters.sortDirection}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        {/* Genre Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-400">
            <FaFilter />
            <h3 className="font-medium">Genre</h3>
          </div>
          <select
            className="w-full bg-[#1A1D29] px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 transition-colors"
            onChange={(e) =>
              handleFilterChange({ genre: Number(e.target.value) || undefined })
            }
            value={filters.genre || ""}
          >
            <option value="">All Genres</option>
            {genres.map((genre: Genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-400">
            <FaCalendar />
            <h3 className="font-medium">Year</h3>
          </div>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            placeholder="Enter year"
            className="w-full bg-[#1A1D29] px-4 py-2 rounded-lg border border-gray-700 focus:border-green-500 transition-colors"
            onChange={(e) =>
              handleFilterChange({ year: Number(e.target.value) || undefined })
            }
            value={filters.year || ""}
          />
        </div>

        {/* Rating Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-yellow-400">
            <FaStar />
            <h3 className="font-medium">Rating</h3>
          </div>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              className="w-full accent-yellow-500"
              onChange={(e) =>
                handleFilterChange({ minRating: Number(e.target.value) })
              }
              value={filters.minRating}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Min: {filters.minRating}</span>
              <span>Max: 10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
