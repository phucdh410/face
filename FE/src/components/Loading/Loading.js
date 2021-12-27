import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div id="preloader-container" className="row" style={{ display: "block" }}>
      <div className="loader">
        <div className="preloader">
          <div className="preloader-container">
            <span className="preloader-text">
              Please waiting a little bit...
            </span>
            <div className="preloader-animation"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
