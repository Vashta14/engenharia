import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomTable, CustomTableProps, Column } from ".";

describe("CustomTable", () => {
  const columns: Array<Column<{ id: number; name: string }>> = [
    { name: "ID", field: (item) => item.id },
    { name: "Name", field: (item) => item.name },
  ];

  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  const props: CustomTableProps<{ id: number; name: string }> = {
    items: items,
    columns: columns,
  };

  it("renders component with data", () => {
    render(<CustomTable {...props} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    expect(screen.queryByText("Não foram encontrados registros!")).toBeNull();
  });

  it("renders component without data", () => {
    const emptyProps: CustomTableProps<{ id: number; name: string }> = {
      items: [],
      columns: columns,
    };

    render(<CustomTable {...emptyProps} />);

    expect(
      screen.getByText("Não foram encontrados registros!")
    ).toBeInTheDocument();
  });
});
