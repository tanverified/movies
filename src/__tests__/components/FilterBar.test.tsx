import React from "react";
import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "@/app/components/FilterBar";
import "@testing-library/jest-dom";

const mockGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Drama" },
  { id: 3, name: "Comedy" }
];

describe("FilterBar", () => {
  const onFilterChange = vi.fn();

  beforeEach(() => {
    onFilterChange.mockClear();
  });

  it("renders all filter sections correctly", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sort" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Genre" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Year" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rating" })).toBeInTheDocument();
  });

  it("updates sort criteria when changed", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    const sortSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(sortSelect, { target: { value: "release_date" } });
    
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      sortBy: "release_date"
    }));
  });

  it("updates sort direction when changed", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    const directionSelect = screen.getAllByRole("combobox")[1];
    fireEvent.change(directionSelect, { target: { value: "asc" } });
    
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      sortDirection: "asc"
    }));
  });

  it("renders all genre options and handles selection", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    const genreSelect = screen.getAllByRole("combobox")[2];
    
    mockGenres.forEach(genre => {
      expect(screen.getByRole("option", { name: genre.name })).toBeInTheDocument();
    });

    fireEvent.change(genreSelect, { target: { value: "1" } });
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      genre: 1
    }));
  });

  it("handles year input changes", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    const yearInput = screen.getByPlaceholderText("Enter year");
    fireEvent.change(yearInput, { target: { value: "2023" } });
    
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      year: 2023
    }));
  });

  it("handles rating slider changes", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    const ratingSlider = screen.getByRole("slider");
    fireEvent.change(ratingSlider, { target: { value: "7.5" } });
    
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      minRating: 7.5
    }));
  });

  it("displays current rating value", () => {
    render(<FilterBar onFilterChange={onFilterChange} genres={mockGenres} />);
    
    const ratingSlider = screen.getByRole("slider");
    fireEvent.change(ratingSlider, { target: { value: "6.5" } });
    
    expect(screen.getByText("Min: 6.5")).toBeInTheDocument();
    expect(screen.getByText("Max: 10")).toBeInTheDocument();
  });
});
