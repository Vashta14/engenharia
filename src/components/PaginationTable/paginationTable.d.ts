interface PaginationTableProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  totalItems: number;
}
