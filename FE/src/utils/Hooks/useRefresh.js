import { useEffect } from "react";
import axios from "axios";

let source = axios.CancelToken.source();
const useRefresh = (handleRequest, pages, page, searchInput) => {
  //Lấy dữ liệu lần đầu
  useEffect(() => {
    window.loading();
    handleRequest(pages, page);
    return () => {
      if (source) source.cancel();
    };
  }, [handleRequest, pages, page]);

  //Lấy dữ liệu lại mỗi khi thay đổi/search store
  useEffect(() => {
    handleRequest(0, 0);
    return () => {
      if (source) source.cancel();
    };
  }, [searchInput]);
};
export default useRefresh;
