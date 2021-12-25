import React, { memo, useState, useEffect } from "react";

const ProgressBar = (props) => {
  const styles = {
    height: "4px",
    marginTop: "10px",
  };
  const getColor = (type) => {
    switch (type) {
      case "success":
        return "#6ac927";
      case "error":
        return "#f76f76";
      case "warning":
        return "#f4d660";
      case "info":
        return "#189ac1";
      default:
        break;
    }
  };
  const color = getColor(props.color);

  const [width, setWidth] = useState(100);
  useEffect(() => {
    const timerId = setInterval(() => {
      setWidth(width - 0.5);
    }, 17);
    return () => {
      clearInterval(timerId);
    };
  }, [width]);
  //background: `${props.color}`
  return (
    <div
      className="popup-progress-bar"
      style={{ ...styles, width: `${width}%`, background: `${color}` }}
    ></div>
  );
};

export default memo(ProgressBar);
