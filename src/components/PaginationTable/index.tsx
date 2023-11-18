import { Pagination } from "react-bootstrap";

export function PaginationTable(props: PaginationTableProps) {
  const { itemsPerPage, setPage, page, totalItems } = props;
  const lastPage = Math.floor(totalItems / itemsPerPage);
  return (
    <Pagination>
      <Pagination.First onClick={() => setPage(1)} />
      <Pagination.Ellipsis />
      {page - 1 > 0 && <Pagination.Prev onClick={() => setPage(page - 1)} />}
      <Pagination.Item disabled>{page}</Pagination.Item>
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Ellipsis />
      {page + 1 < lastPage && (
        <Pagination.Prev onClick={() => setPage(page + 1)} />
      )}
      <Pagination.Last onClick={() => setPage(lastPage)} />
    </Pagination>
  );
}
