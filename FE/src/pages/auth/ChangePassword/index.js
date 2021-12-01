import React, {
  Suspense, lazy, useEffect, useCallback,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";

import { changePassword } from "../../../actions/auth.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import { FACE_R_APP_TITLE } from "../../../config";

const Header = lazy(() => import("./components/Header"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const ChangePassword = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector(
    (state) => ({
      errors: state.errors,
    }),
    shallowEqual,
  );

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

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      history.goBack();
    },
    [history],
  );

  const logoutUser = useCallback(
    async (e) => {
      e.preventDefault();

      window.start_preloader();
      await dispatch(logoutUser(history));
      window.stop_preloader();
    },
    [dispatch, history],
  );

  const onSubmit = useCallback(
    async (values) => {
      window.start_preloader();

      source = axios.CancelToken.source();
      const payload = {
        old_password: values.oldPassword,
        new_password: values.newPassword,
        confirm_password: values.confirmPassword,
      };

      await dispatch(changePassword(payload, source.token, history));
      window.stop_preloader();
    },
    [dispatch, history],
  );

  return (
    <Box className="register-wrapper">
      <Box className="container-center lg">
        <Box className="panel panel-bd">
          <Suspense fallback={<SuspenseLoading />}>
            <Header />
            <Body
              goBack={goBack}
              logoutUser={logoutUser}
              onSubmit={onSubmit}
            />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
});

export default withRouter(ChangePassword);
