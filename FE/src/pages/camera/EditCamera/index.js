import "../styles/custom.css";
import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { FACE_R_APP_TITLE } from "../../../config";
import { getCamera, editCamera } from "../../../actions/camera.actions";
import { LoadingContext } from "../../../context/LoadingContext";
import { PopupContext } from "../../../context/PopupContext";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditCamera = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
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
    shallowEqual
  );
  const { stores, success, errors } = state;
  const [camera, setCamera] = useState(state.camera);

  const handleRequest = useCallback(
    (id) => {
      source = axios.CancelToken.source();
      dispatch(getCamera(id, source.token, history));
    },
    [dispatch, history]
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
    return () => {
      if (source) source.cancel();
    };
  }, [handleRequest, id]);

  useEffect(() => {
    if (state.camera && state.camera.id.toString() === id)
      setCamera(state.camera);
  }, [state.camera]);

  const goBack = useGoBack();

  const onSubmit = useOnSubmit(source, editCamera, errors);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />
      {camera && camera === state.camera && (
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
