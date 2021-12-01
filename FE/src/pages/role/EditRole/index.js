import React, {
  Suspense, lazy, useEffect, useCallback, useState,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";

import axios from "axios";

import { getRole, editRole } from "../../../actions/role.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditRole = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      role: state.role.role,
      success: state.role.success,
      errors: state.errors,
    }),
    shallowEqual,
  );

  const { success, errors } = state;
  const [role, setRole] = useState(null);

  const handleRequest = useCallback(
    async (id) => {
      source = axios.CancelToken.source();
      await dispatch(getRole(id, source.token, history));
    },
    [dispatch, history],
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);

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

  useEffect(() => {
    if (state.role && state.role.id.toString() === id) setRole(state.role);
  }, [state.role]);

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      history.goBack();
    },
    [history],
  );

  const onSubmit = useCallback(
    async (values) => {
      source = axios.CancelToken.source();
      const params = {
        ...values,
        cancel_token: source.token,
      };

      window.start_preloader();
      await dispatch(editRole(params, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Lưu thông tin vai trò người dùng thành công!",
          2000,
          "success",
          () => {
            history.goBack();
            window.stop_preloader();
          },
        );
      } else window.stop_preloader();
    },
    [dispatch, history, success],
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {role && (
      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />
            <Body
              role={role}
              goBack={goBack}
              onSubmit={onSubmit}
            />
          </Box>
        </Box>
      </Box>
      )}
    </Suspense>
  );
});

export default withRouter(EditRole);
