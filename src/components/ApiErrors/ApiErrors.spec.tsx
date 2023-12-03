import { render, screen, fireEvent } from "@testing-library/react";
import { ApiErrors } from ".";
import "@testing-library/jest-dom";

describe("ApiErrors", () => {
  it("renders ApiErrors component with default props", () => {
    const items = ["Error 1", "Error 2"];
    render(<ApiErrors items={items} />);
    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
  });

  it("renders ApiErrors component with custom variant", () => {
    const items = ["Error 1", "Error 2"];
    render(<ApiErrors items={items} variant="warning" />);
    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
  });

  it("calls onChange when closing an alert", async () => {
    const items = ["Error 1"];
    const onChangeMock = jest.fn();
    render(<ApiErrors items={items} onChange={onChangeMock} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("does not render alerts beyond MAX_ERRORS_TO_SHOW", () => {
    const items = ["Error 1", "Error 2", "Error 3"];
    render(<ApiErrors items={items} />);
    expect(screen.getByText("Error 1")).toBeInTheDocument();
    expect(screen.getByText("Error 2")).toBeInTheDocument();
    expect(screen.queryByText("Error 3")).toBeNull();
  });

  // Add more test cases as needed
});
