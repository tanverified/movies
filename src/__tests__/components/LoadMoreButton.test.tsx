import React from "react";
import { it, expect, describe, vitest } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadMoreButton } from "@/app/components/LoadMoreButton";

describe("LoadMoreButton", () => {
  it("should render the load more button", () => {
    const onClick = vitest.fn();
    render(<LoadMoreButton onClick={onClick} isLoading={false} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/load more/i);
  });
});
