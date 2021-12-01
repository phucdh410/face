import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const AuthorizeRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (auth.isAuth === true ? (
      <Component {...props} />
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

AuthorizeRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AuthorizeRoute);
