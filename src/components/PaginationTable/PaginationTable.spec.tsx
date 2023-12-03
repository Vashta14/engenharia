import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PaginationTable } from ".";

describe("PaginationTable", () => {
  const setPageMock = jest.fn();

  test("renders component with pagination controls", () => {
    render(
      <PaginationTable
        itemsPerPage={10}
        setPage={setPageMock}
        page={5}
        totalItems={100}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("clicking on next page updates the page", () => {
    render(
      <PaginationTable
        itemsPerPage={10}
        setPage={setPageMock}
        page={1}
        totalItems={100}
      />
    );

    fireEvent.click(screen.getByText("2"));
    expect(setPageMock).toHaveBeenCalledWith(2);
  });

  test("clicking on previous page updates the page", () => {
    render(
      <PaginationTable
        itemsPerPage={10}
        setPage={setPageMock}
        page={2}
        totalItems={100}
      />
    );

    fireEvent.click(screen.getByText("1"));
    expect(setPageMock).toHaveBeenCalledWith(1);
  });

  test("clicking on first updates the page", () => {
    render(
      <PaginationTable
        itemsPerPage={10}
        setPage={setPageMock}
        page={5}
        totalItems={100}
      />
    );

    fireEvent.click(screen.getByText("1"));
    expect(setPageMock).toHaveBeenCalledWith(1);
  });

  test("clicking on last updates the page", () => {
    render(
      <PaginationTable
        itemsPerPage={10}
        setPage={setPageMock}
        page={5}
        totalItems={100}
      />
    );

    fireEvent.click(screen.getByText("10"));
    expect(setPageMock).toHaveBeenCalledWith(10);
  });
});
