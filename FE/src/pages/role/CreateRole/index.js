import React, {
  Suspense, lazy, useEffect, useCallback,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";

import { addRole } from "../../../actions/role.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateRole = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { success, errors } = useSelector(
    (state) => ({
      success: state.role.success,
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

  const onSubmit = useCallback(
    async (values) => {
      source = axios.CancelToken.source();
      const params = {
        ...values,
      };

      window.start_preloader();
      await dispatch(addRole(params, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Lưu thông tin vai trò thành công!",
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

      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />
            <Body
              goBack={goBack}
              onSubmit={onSubmit}
            />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(CreateRole);
