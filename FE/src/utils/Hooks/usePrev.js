import { useCallback } from "react";
import { prevHandler } from "../handler";

const usePrev = (pages, page, handleRequest) => {
  const prev = useCallback(
    (e) => {
      prevHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages]
  );

  return prev;
};

export default usePrev;
