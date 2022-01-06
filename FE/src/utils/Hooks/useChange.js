import { useCallback } from "react";

const useChange = (setSearch) => {
  const onChange = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }, []);

  return onChange;
};

export default useChange;
