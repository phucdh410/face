import React, {
  Suspense, lazy, useEffect, useCallback,
} from "react";
import { Box } from "@mui/system";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useLocation } from "react-router";

import axios from "axios";

import { loginUser } from "../../../actions/auth.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import { FACE_R_APP_TITLE } from "../../../config";

const Header = lazy(() => import("./components/Header"));
const Body = lazy(() => import("./components/Body"));
const Footer = lazy(() => import("./components/Footer"));

const source = axios.CancelToken.source();

const Login = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { isAuth, errors } = useSelector(
    (state) => ({
      isAuth: state.auth.isAuth,
      errors: state.errors,
    }),
    shallowEqual,
  );

  useEffect(() => {
    if (isAuth) {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  }, [history, isAuth, location.state]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        window.toast(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }

    return () => {
      if (source) source.cancel();
    };
  }, [errors]);

  const onSubmit = useCallback(
    async (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      console.log("payload: ", payload);

      window.start_preloader();
      await dispatch(loginUser(payload, source.token));
      window.stop_preloader();
    },
    [dispatch],
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Box className="login-wrapper">
        <Box className="container-center">
          <Box className="panel panel-bd">
            <Header />
            <Body onSubmit={onSubmit} />
          </Box>

          <Footer />
        </Box>
      </Box>
    </Suspense>
  );
});

export default Login;
