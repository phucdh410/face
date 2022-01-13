import { useCallback, useEffect } from "react";
import { debounce } from "lodash";

const useChange = (setSearchStore, setSearchInput, handleRequest) => {
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
    switch (e.target.name) {
      case "search_store_id":
        setSearchStore(e.target.value);
        break;
      case "search_input":
        setSearchInput(e.target.value);
        break;
      default:
        break;
    }
  }, []);

  return onChange;
};

export default useChange;
