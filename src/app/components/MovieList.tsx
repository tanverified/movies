"use client";
import React, { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { FilterBar } from "./FilterBar";
import { LoadMoreButton } from "./LoadMoreButton";
import { MovieCard } from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import { SearchBar } from "./SearchBar";

export const MovieList = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const {
    movies,
    loadMore,
    search,
    isFetching,
    isError,
    hasNextPage,
    genres,
    updateFilters,
  } = useMovies();

  if (isError) {
    return <div className="text-center text-red-500">Error loading movies</div>;
  }

  return (
    <div className="w-full transition-all duration-300">
      <div className="px-4 md:px-6">
        <div className="flex justify-between items-center md:hidden">
          <button
            className="p-2 m-2 bg-[#2A2D37] rounded transition-colors"
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            aria-label="Toggle filter"
          >
            Filter
          </button>
        </div>

        {isFilterVisible && (
          <div
            data-testid="mobile-filter"
            className="md:hidden px-4 py-6 bg-[#2A2D37] shadow-lg mb-6"
          >
            {genres && (
              <FilterBar onFilterChange={updateFilters} genres={genres} />
            )}
          </div>
        )}

        <aside className="hidden md:block fixed left-0 top-20 w-64 h-[calc(100vh-5rem)] overflow-y-auto px-4 py-6 bg-[#2A2D37] shadow-lg">
          {genres && (
            <FilterBar onFilterChange={updateFilters} genres={genres} />
          )}
        </aside>

        <div className="md:ml-64">
          <SearchBar onSearch={search} />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {isFetching && !movies.length
              ? Array.from({ length: 10 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))
              : movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
          </div>
          {hasNextPage && (
            <div className="mt-8 flex justify-center">
              <LoadMoreButton
                onClick={() => loadMore()}
                isLoading={isFetching}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
