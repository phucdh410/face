import React, {
  Suspense, lazy, useEffect, useCallback, useState,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";

import axios from "axios";

import { getCamera, editCamera } from "../../../actions/camera.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditCamera = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      stores: state.root.stores,
      camera: state.camera.camera,
      success: state.camera.success,
      errors: state.errors,
    }),
    shallowEqual,
  );

  const { stores, success, errors } = state;
  const [camera, setCamera] = useState(null);

  const handleRequest = useCallback(
    async (id) => {
      source = axios.CancelToken.source();
      await dispatch(getCamera(id, source.token, history));
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
    if (state.camera && state.camera.id.toString() === id) setCamera(state.camera);
  }, [state.camera]);

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      history.goBack();
    },
    [history],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const isValid = window.isValidated("#edit-device");

      if (isValid) {
        source = axios.CancelToken.source();
        const params = {
          ...camera,
          store_id: parseInt(camera.store_id),
          cancel_token: source.token,
        };

        window.start_preloader();
        await dispatch(editCamera(params, history));

        if (success) {
          window.toast(
            FACE_R_APP_TITLE,
            "Lưu thông tin camera thành công!",
            2000,
            "success",
            () => {
              history.goBack();
              window.stop_preloader();
            },
          );
        } else window.stop_preloader();
      }
    },
    [camera, dispatch, history, success],
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {camera && (
      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />
            <Body
              camera={camera}
              stores={stores}
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

export default withRouter(EditCamera);
