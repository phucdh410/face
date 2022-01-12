import { useCallback } from "react";
// import { debounce } from "lodash";
import debounce from "lodash.debounce";

const useChange = (setSearch, handleRequest) => {
  const debounceChange = useCallback(
    debounce((value) => {
      console.log("value>>>", value);
      handleRequest(0, 0);
    }, 500),
    []
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      debounceChange(e.target.value);
      setSearch(e.target.value);
    },
    [handleRequest]
  );

  return onChange;
};

export default useChange;
