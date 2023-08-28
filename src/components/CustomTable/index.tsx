import { Table } from "react-bootstrap";
import React from "react";
import { Placeholder } from "react-bootstrap";

interface Colum<T> {
  name: string;
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "";
  direction?: "start" | "center" | "end";
  field: (item: T) => React.JSX.Element | string;
}

interface CustomTableProps<T> {
  items: Array<T>;
  columns: Array<Colum<T>>;
  actions: (item: T) => React.JSX.Element;
  isLoading?: boolean;
}

export function CustomTable<T>(props: CustomTableProps<T>) {
  const { items, columns, actions, isLoading = false } = props;

  const loadingTable = () => {
    const rows: Array<React.JSX.Element> = [];
    for (let i = 0; i < 3; i++) {
      const cells: Array<React.JSX.Element> = [];
      for (let j = 0; j < columns.length; j++) {
        cells.push(
          <td>
            <Placeholder as="p" animation="glow" className="mb-1">
              <Placeholder xs={12} className=" rounded-1" />
            </Placeholder>
          </td>
        );
      }
      rows.push(<tr>{cells}</tr>);
    }

    return <>{rows}</>;
  };

  return (
    <Table responsive="lg" className=" table-hover mb-4 table-dark" hover>
      <thead>
        <tr>
          {columns.map((item: Colum<T>, index: number) => (
            <th
              key={`${item.name}: ${index}`}
              className={`col-${item.size} text-${item.direction || "start"}`}
            >
              {item.name}
            </th>
          ))}
          <th className="col-1 text-end fw-bold">
            <div className="d-flex justify-content-end w-100">Ações</div>
          </th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {isLoading ? (
          <>{loadingTable}</>
        ) : items?.length > 0 ? (
          items.map((item: T, index: number) => (
            <tr key={index}>
              {columns.map((colum: Colum<T>, index: number) => (
                <td
                  key={`${colum.field(item)}: ${index}`}
                  className={`text-${colum.direction || "start"}`}
                >
                  {colum.field(item)}
                </td>
              ))}
              <td className="text-end">
                <div
                  className="btn-group btn-group-sm text-end"
                  role="group"
                  aria-label="Basic outlined example"
                >
                  <>{actions(item)}</>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td>
              <span>Nenhum registro encontrado</span>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
