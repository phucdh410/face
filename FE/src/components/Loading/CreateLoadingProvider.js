import React, { useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import Loading from "./Loading";

const CreateLoadingProvider = (props) => {
  // LoadingContext init
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };

  return (
    <LoadingContext.Provider value={value}>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        props.children
      )}
    </LoadingContext.Provider>
  );
};

export default CreateLoadingProvider;
