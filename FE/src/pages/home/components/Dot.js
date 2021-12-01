import React from "react";
import PropTypes from "prop-types";

const Dot = React.memo(({ value }) => (
  value !== 2
    ? value !== 1
      ? (
        <span className="dot-danger m-r-5" />
      ) : (
        <span className="dot-success m-r-5" />
      ) : (
        <span className="dot-warning m-r-5" />
    )
));

Dot.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Dot;
