import { useCallback } from "react";

const useChange = (setSearch, handleRequest) => {
  const onChange = useCallback(
    (e) => {
      e.preventDefault();
      setSearch(e.target.value);
      handleRequest(0, 0);
    },
    [handleRequest]
  );

  return onChange;
};

export default useChange;

// import { useCallback } from "react";
// import debounce from "lodash";

// const useChange = (setSearch, handleRequest) => {
//   const debounceChange = useCallback(
//     debounce((e) => {
//       e.preventDefault();
//       setSearch(e.target.value);
//       handleRequest(0, 0);
//     }, 1500),
//     []
//   );
//   return debounceChange;
// };

// export default useChange;
