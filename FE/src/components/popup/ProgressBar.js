import React, { memo, useState, useEffect } from "react";

const ProgressBar = () => {
  const styles = {
    height: "4px",
    marginTop: "10px",
    opacity: 0.4,
    backgroundColor: "#000",
  };
  const [width, setWidth] = useState(100);
  useEffect(() => {
    const timerId = setInterval(() => {
      setWidth(width - 0.5);
    }, 10);
    return () => {
      clearInterval(timerId);
    };
  }, [width]);
  return (
    <div
      className="popup-progress-bar"
      style={{ ...styles, width: `${width}%` }}
    ></div>
  );
};

export default memo(ProgressBar);
