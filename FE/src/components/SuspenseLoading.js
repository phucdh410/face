import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import LoadingBar from "react-top-loading-bar";

const SuspenseLoading = React.memo(({ color, shadow }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref !== null) {
      ref.current.continuousStart();
    }
  }, [ref]);

  return (
    <div>
      <LoadingBar color={color} ref={ref} shadow={shadow} />
    </div>
  );
});

SuspenseLoading.propTypes = {
  color: PropTypes.string,
  shadow: PropTypes.bool,
};

SuspenseLoading.defaultProps = {
  color: "#28b485",
  shadow: true,
};

export default SuspenseLoading;
