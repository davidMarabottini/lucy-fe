import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select from "./Select";

const mockOptions = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
  { label: "Other", value: "O" },
];

describe("Select Atom", () => {
  it("should render the label and initial placeholder", () => {
    render(<Select options={mockOptions} label="Gender" name="gender" />);
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
  });

  it("should open the menu on focus", () => {
    render(<Select options={mockOptions} name="gender" />);
    const input = screen.getByRole("textbox");
    
    fireEvent.focus(input);
    
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });

  it("should filter options based on search term", () => {
    render(<Select options={mockOptions} name="gender" />);
    const input = screen.getByRole("textbox");
    
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Fem" } });

    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.queryByText("Male")).not.toBeInTheDocument();
  });

  it("should update values and close menu when an option is selected", () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <Select options={mockOptions} name="gender" onValueChange={onValueChange} />
    );
    
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    
    const option = screen.getByText("Male");
    fireEvent.mouseDown(option);

    expect(onValueChange).toHaveBeenCalledWith("M");
    expect(input).toHaveValue("Male");
    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toHaveValue("M");
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("should close the menu when focus is lost (blur)", async () => {
    render(<Select options={mockOptions} name="gender" />);
    const input = screen.getByRole("textbox");
    
    fireEvent.focus(input);
    expect(screen.getByRole("list")).toBeInTheDocument();
    
    fireEvent.blur(input);
    
    await waitFor(() => {
      expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
  });
});