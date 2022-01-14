import React, { useCallback } from "react";
import { nextHandler, prevHandler } from "../handler";

const usePagination = (pages, page, handleRequest) => {
  const prev = useCallback(
    (e) => {
      e.preventDefault();
      prevHandler(e, pages, page, handleRequest);
    },
    [handleRequest, pages, page]
  );
  const next = useCallback(
    (e) => {
      e.preventDefault();
      nextHandler(e, pages, page, handleRequest);
    },
    [handleRequest, pages, page]
  );
  return { prev, next };
};

export default usePagination;
