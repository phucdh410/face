import { useCallback } from "react";
import { nextHandler } from "./handler";

const useNext = (pages, page, handleRequest) => {
  const next = useCallback(
    (e) => {
      nextHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages]
  );

  return next;
};

export default useNext;
