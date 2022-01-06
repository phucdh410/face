import { useCallback } from "react";

const useChange = (setSearchStore) => {
  const onChange = useCallback((e) => {
    e.preventDefault();
    setSearchStore(e.target.value);
  }, []);

  return onChange;
};

export default useChange;
