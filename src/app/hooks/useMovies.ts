import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchGenres } from "@/services/tmdbService";
import { FilterOptions } from "@/types/filters";

export const useMovies = (initialSearchQuery = "") => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "popularity",
    sortDirection: "desc",
    minRating: 0,
  });

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ["movies", searchQuery, filters],
      queryFn: ({ pageParam = 1 }) =>
        fetchMovies(pageParam, searchQuery, filters),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  const movies = data?.pages.flatMap((page) => page.results) || [];

  return {
    movies,
    genres,
    loadMore: fetchNextPage,
    search: setSearchQuery,
    updateFilters: setFilters,
    isFetching,
    isError,
    hasNextPage,
  };
};
