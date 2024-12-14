import React from "react";
import { it, expect, describe, vitest } from "vitest";
import { render, screen } from "@testing-library/react";
import { SearchBar } from "@/app/components/SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar", () => {
  it("should render the search bar component when onSearch is provided", () => {
    const onSearch = vitest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
  });

  it("should call onSearch when the button is clicked", () => {
    const onSearch = vitest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const searchInput = screen.getByRole("textbox");
    const searchButton = screen.getByRole("button");
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    searchButton.click();
    expect(onSearch).toHaveBeenCalled();
  });
});
