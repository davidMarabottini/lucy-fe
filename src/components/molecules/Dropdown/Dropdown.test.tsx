import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {DropDownHead} from "./Dropdown";

describe("DropdownHead component", () => {  
  it("should renders only dropdown head on isOpen false", async () => {
    render(
      <DropDownHead label={<div>Apri</div>} isOpen={false} setIsOpen={vi.fn()}>
        <div>testo</div>
      </DropDownHead>
    );
    expect(screen.getByRole("button", { name: /apri/i })).toBeInTheDocument();
    expect(screen.queryByText("testo")).not.toBeInTheDocument();
  });

  it("should renders opened dropdown on isOpen true", async () => {
    render(
      <DropDownHead label={<div>Apri</div>} isOpen setIsOpen={vi.fn()}>
        <div>testo</div>
      </DropDownHead>
    );

    expect(screen.queryByText("testo")).toBeInTheDocument();
  });

  it("should open dropdown when clicked", async () => {
    const user = userEvent.setup();
    render(
      <DropDownHead label={<div>Apri</div>} setIsOpen={vi.fn()}>
        <div>testo</div>
      </DropDownHead>
    );
    expect(screen.getByRole("button", { name: /apri/i })).toBeInTheDocument();

    const trigger = screen.getByRole("button");
    expect(screen.queryByText("testo")).not.toBeInTheDocument();
    await user.click(trigger);
    expect(screen.getByText("testo")).toBeInTheDocument();
  });
  
});