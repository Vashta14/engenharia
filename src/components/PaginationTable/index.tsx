import { Pagination } from "react-bootstrap";

export function PaginationTable(props: PaginationTableProps) {
  const { itemsPerPage, setPage, page, totalItems } = props;
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  return (
    <Pagination className="d-flex justify-content-end pagination-dark">
      {page - 1 > 0 && (
        <>
          {page !== 2 && (
            <>
              <Pagination.Prev onClick={() => setPage(1)}>{1}</Pagination.Prev>
              <Pagination.Ellipsis disabled />
            </>
          )}

          <Pagination.Prev onClick={() => setPage(page - 1)}>
            {page - 1}
          </Pagination.Prev>
        </>
      )}
      <Pagination.Item disabled>{page}</Pagination.Item>
      {page + 1 <= lastPage && (
        <>
          <Pagination.Prev onClick={() => setPage(page + 1)}>
            {page + 1}
          </Pagination.Prev>
          {page + 1 !== lastPage && (
            <>
              <Pagination.Ellipsis disabled />
              <Pagination.Prev onClick={() => setPage(lastPage)}>
                {lastPage}
              </Pagination.Prev>
            </>
          )}
        </>
      )}
    </Pagination>
  );
}
