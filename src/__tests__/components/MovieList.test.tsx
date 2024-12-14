import React from "react";
import { it, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieList } from "@/app/components/MovieList";
import { useMovies } from "@/app/hooks/useMovies";
import "@testing-library/jest-dom";

vi.mock("@/app/hooks/useMovies", () => ({
  useMovies: vi.fn(),
}));

const mockMovies = [
  {
    id: 1,
    title: "Test Movie 1",
    poster_path: "/poster1.jpg",
    overview: "Overview 1",
    vote_average: 8.5,
    release_date: "2023-01-01",
  },
  {
    id: 2,
    title: "Test Movie 2",
    poster_path: "/poster2.jpg",
    overview: "Overview 2",
    vote_average: 7.5,
    release_date: "2023-02-01",
  },
];

const mockGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
];

describe("MovieList", () => {
  it("renders movies grid when data is available", () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: mockMovies,
      genres: mockGenres,
      loadMore: vi.fn(),
      search: vi.fn(),
      updateFilters: vi.fn(),
      isFetching: false,
      isError: false,
      hasNextPage: true,
    });

    render(<MovieList />);
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument();
  });

  it("renders loading skeletons when fetching initial data", () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: [],
      genres: mockGenres,
      loadMore: vi.fn(),
      search: vi.fn(),
      updateFilters: vi.fn(),
      isFetching: true,
      isError: false,
      hasNextPage: false,
    });

    render(<MovieList />);
    const skeletons = screen.getAllByTestId("movie-skeleton");
    expect(skeletons).toHaveLength(10);
  });

  it("renders error message when there is an error", () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: [],
      genres: null,
      loadMore: vi.fn(),
      search: vi.fn(),
      updateFilters: vi.fn(),
      isFetching: false,
      isError: true,
      hasNextPage: false,
    });

    render(<MovieList />);
    expect(screen.getByText("Error loading movies")).toBeInTheDocument();
  });

  it("shows/hides filter bar on mobile when toggle button is clicked", () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: mockMovies,
      genres: mockGenres,
      loadMore: vi.fn(),
      search: vi.fn(),
      updateFilters: vi.fn(),
      isFetching: false,
      isError: false,
      hasNextPage: true,
    });

    render(<MovieList />);
    const filterButton = screen.getByLabelText("Toggle filter");

    fireEvent.click(filterButton);
    expect(screen.getByRole("complementary")).toBeInTheDocument();
  });

  it("renders load more button when hasNextPage is true", () => {
    const loadMore = vi.fn();
    vi.mocked(useMovies).mockReturnValue({
      movies: mockMovies,
      genres: mockGenres,
      loadMore,
      search: vi.fn(),
      updateFilters: vi.fn(),
      isFetching: false,
      isError: false,
      hasNextPage: true,
    });

    render(<MovieList />);
    const loadMoreButton = screen.getByRole("button", { name: /load more/i });
    fireEvent.click(loadMoreButton);
    expect(loadMore).toHaveBeenCalled();
  });
});
