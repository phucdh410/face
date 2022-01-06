import { useEffect } from "react";
import axios from "axios";

let source = axios.CancelToken.source();
const useUpdate = (
  getInitialProps,
  handleRequest,
  pages,
  page,
  searchStore
) => {
  useEffect(() => {
    window.loading();
    getInitialProps();
    handleRequest(pages, page);
    return () => {
      if (source) source.cancel();
    };
  }, [getInitialProps, page, pages]);
  useEffect(() => {
    handleRequest(0, 0);
    return () => {
      if (source) source.cancel();
    };
  }, [searchStore]);
};

export default useUpdate;
