import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

const MenuItem = React.memo(
  ({
    routename, icon, label, isActive,
  }) => (
    <li
      className={classnames({
        active: isActive,
      })}
    >
      <Link className="material-ripple" to={`/${routename}`}>
        <i className="material-icons">{icon}</i>
        {label}
      </Link>
    </li>
  ),
);

MenuItem.propTypes = {
  routename: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

MenuItem.defaultProps = {
  isActive: false,
};

export default MenuItem;
