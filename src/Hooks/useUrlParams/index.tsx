import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function useUrlParams(): [
  URLSearchParams,
  (newParams: Record<string, string>) => void
] {
  const location = useLocation();
  const [params, setParams] = useState(new URLSearchParams(location.search));

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
    setParams(new URLSearchParams(location.search));
  }, [location]);

  return [params, setUrlParams];
}

export default useUrlParams;
