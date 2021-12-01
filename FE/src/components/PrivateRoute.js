import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component, socket, auth, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (auth.isAuth === true ? (
      <Component socket={socket} {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    ))}
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  socket: PropTypes.object,
};

PrivateRoute.defaultProps = {
  socket: null,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
