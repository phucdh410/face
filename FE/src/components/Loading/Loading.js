import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div>
      <div className="overlay"></div>
      <div className="lds-container">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
