import { useEffect, useState } from "react";

function useUrlParams(): [
  URLSearchParams,
  (newParams: Record<string, string>) => void
] {
  const [params, setParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const setUrlParams = (items: Record<string, string>) => {
    const newParams = new URLSearchParams(items);
    setParams(newParams);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${
        [...newParams.keys()].length > 0 ? "?" : ""
      }${newParams}`
    );
  };

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search));
  }, []);

  return [params, setUrlParams];
}

export default useUrlParams;
