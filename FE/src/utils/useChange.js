import React, { useCallback } from "react";

const useChange = (setSearchStore, handleRequest) => {
  console.log("Tạo lại hàm 1");
  const onChange = (e) => {
    console.log("Tạo lại hàm 2");
    e.preventDefault();
    setSearchStore(e.target.value);
    handleRequest(0, 0);
  };

  return onChange;
};

export default useChange;
