import { useCallback, useEffect } from "react";
import { debounce } from "lodash";

const useChange = (setSearch, handleRequest) => {
  useEffect(() => {
    debounceChange(handleRequest);
  }, [handleRequest]);

  const debounceChange = useCallback(
    debounce((handleRequest) => {
      handleRequest(0, 0);
    }, 500),
    []
  );

  const onChange = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }, []);

  return onChange;
};

export default useChange;
