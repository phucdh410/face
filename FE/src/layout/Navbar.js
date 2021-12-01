import React from "react";
import { Link } from "react-router-dom";

const Navbar = React.memo(() => (
  <nav className="navbar navbar-fixed-top">
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle"
        data-toggle="collapse"
        data-target=".navbar-collapse"
      >
        <span className="sr-only">Toggle navigation</span>
        <i className="material-icons">apps</i>
      </button>

      <Link className="navbar-brand" to="/">
        <div>
          <img
            className="main-logo"
            src="/icon.png"
            alt=""
            style={{ width: `${48}px` }}
          />
          <span
            style={{
              fontSize: `${16}px`,
              color: "#fff",
              marginLeft: `${5}px`,
            }}
          >
            FaceR System
          </span>
        </div>
      </Link>
    </div>

    <div className="nav-container">
      <ul className="nav navbar-nav hidden-xs">
        <li>
          <a id="fullscreen" href="#/">
            <i className="material-icons">fullscreen</i>
            {" "}
          </a>
        </li>
      </ul>
    </div>
  </nav>
));

export default Navbar;
