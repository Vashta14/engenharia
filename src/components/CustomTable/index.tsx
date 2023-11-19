import { Table } from "react-bootstrap";
import React, { ReactNode, SetStateAction } from "react";
import { Placeholder } from "react-bootstrap";
import { PaginationTable } from "../PaginationTable";

export interface Column<T> {
  name?: string | ReactNode;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto";
  direction?: "start" | "center" | "end";
  thClassName?: string;
  tdClassName?: string;
  title?: (item: T) => string;
  field: (item: T, index: number) => React.JSX.Element | string | number;
}

export interface CustomTableProps<T> {
  items: Array<T>;
  columns: Array<Column<T>>;
  isLoading?: boolean;
  itemsPerPage?: number;
  page?: number;
  setPage?: React.Dispatch<SetStateAction<number>>;
  totalItems?: number;
}

export function CustomTable<T>(props: CustomTableProps<T>) {
  const {
    items,
    columns,
    isLoading = false,
    itemsPerPage,
    page,
    setPage = () => {},
    totalItems,
  } = props;

  const TableSkeleton = () => {
    const rows: Array<React.ReactElement> = [];

    for (let i = 0; i < 3; i++) {
      const cells: Array<React.ReactElement> = [];
      for (let j = 0; j < columns.length; j++) {
        cells.push(
          <td key={j}>
            <Placeholder as="p" animation="glow" className="mb-1">
              <Placeholder xs={12} className=" rounded-1" />
            </Placeholder>
          </td>
        );
      }
      rows.push(<tr key={i}>{cells}</tr>);
    }

    return <>{rows}</>;
  };

  return (
    <>
      <Table responsive="lg" className=" table-hover mb-4 table-dark" hover>
        {!columns.some((item) => item.name === undefined) && (
          <thead>
            <tr>
              {columns.map((item: Column<T>, index: number) => (
                <th
                  key={`${item.name}: ${index}`}
                  className={`col-${item.size || "auto"} text-${
                    item.direction || "start"
                  } ${item.thClassName || ""}`}
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="align-middle">
          {isLoading ? (
            <TableSkeleton />
          ) : items?.length > 0 ? (
            items.map((item: T, index: number) => (
              <tr key={index}>
                {columns.map((colum: Column<T>, id: number) => (
                  <td
                    key={`${index}: ${id}`}
                    className={`text-${colum.direction || "start"} ${
                      colum.tdClassName || ""
                    }`}
                    title={`${(colum.title && colum.title(item)) || ""}`}
                  >
                    {colum.field(item, index)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="border-bottom-0">
                <span className="">Não foram encontrados registros!</span>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {totalItems && totalItems > 0 && itemsPerPage && page && setPage ? (
        <PaginationTable
          itemsPerPage={itemsPerPage}
          page={page}
          totalItems={totalItems}
          setPage={setPage}
        />
      ) : (
        <> </>
      )}
    </>
  );
}
