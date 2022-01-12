import { useCallback } from "react";

const useChange = (setSearch, handleRequest) => {
  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      setSearch(e.target.value);
      handleRequest(0, 0);
    },
    [handleRequest]
  );

  return onChange;
};

export default useChange;
