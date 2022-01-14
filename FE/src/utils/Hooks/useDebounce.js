import { debounce } from "lodash";
import { useCallback } from "react";

const useDebounce = () => {
  const debounceChange = useCallback(
    debounce((handleRequest) => {
      handleRequest(0, 0);
    }, 500),
    []
  );

  return debounceChange;
};

export default useDebounce;
