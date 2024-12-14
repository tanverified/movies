import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MovieCard } from "@/app/components/MovieCard";
import { Movie } from "@/types/movie";
import "@testing-library/jest-dom";

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test-poster.jpg",
  overview: "Test movie description",
  vote_average: 8.5,
  release_date: "2024-01-01",
};

describe("MovieCard", () => {
  it("renders movie title correctly", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  it("renders movie overview correctly", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Test movie description")).toBeInTheDocument();
  });

  it("renders release year correctly", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("renders rating with correct color for high scores", () => {
    render(<MovieCard movie={mockMovie} />);
    const rating = screen.getByText("8.5");
    const ratingContainer = rating.closest("div");
    expect(ratingContainer).toHaveClass("bg-green-500");
  });

  it("handles missing poster path with placeholder image", () => {
    const movieWithoutPoster: Movie = { ...mockMovie, poster_path: "" };
    render(<MovieCard movie={movieWithoutPoster} />);
    const image = screen.getByAltText("Test Movie");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("No-Image-Placeholder.png")
    );
  });

  it("handles missing overview with default text", () => {
    const movieWithoutOverview: Movie = { ...mockMovie, overview: "" };
    render(<MovieCard movie={movieWithoutOverview} />);
    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });

  it("renders different rating colors based on score", () => {
    const testCases = [
      { score: 9, expectedClass: "bg-green-500" },
      { score: 7, expectedClass: "bg-yellow-500" },
      { score: 4, expectedClass: "bg-red-500" },
    ];

    testCases.forEach(({ score, expectedClass }) => {
      const movieWithScore: Movie = { ...mockMovie, vote_average: score };
      render(<MovieCard movie={movieWithScore} />);
      const ratingElement = screen.getByText(score.toFixed(1));
      const ratingContainer = ratingElement.closest("div");
      expect(ratingContainer).toHaveClass(expectedClass);
    });
  });
});
