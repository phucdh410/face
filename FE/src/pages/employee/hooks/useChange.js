import { useCallback, useEffect } from "react";
import { debounce } from "lodash";

const useChange = (
  searchStore,
  setSearchStore,
  searchInput,
  setSearchInput,
  handleRequest
) => {
  //Cập nhật danh sách theo search input
  useEffect(() => {
    debounceChange(handleRequest);
  }, [searchInput]);

  const debounceChange = useCallback(
    debounce((handleRequest) => {
      handleRequest(0, 0);
    }, 500),
    []
  );

  //Cập nhật danh sách theo search store
  useEffect(() => {
    handleRequest(0, 0);
  }, [searchStore]);

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
