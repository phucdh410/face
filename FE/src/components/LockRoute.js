import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const LockRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth.isLockScreen !== true ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/lockscreen",
          state: { from: props.location },
        }}
      />
    ))}
  />
);

LockRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LockRoute);
