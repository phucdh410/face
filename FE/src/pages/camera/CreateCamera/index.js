import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";

import { addCamera } from "../../../actions/camera.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";

import Loading from "../../../components/Loading/Loading";
import { LoadingContext } from "../../../context/LoadingContext";
import { PopupContext } from "../../../context/PopupContext";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateCamera = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);

  const dispatch = useDispatch();
  const history = useHistory();
  const { stores, success, errors } = useSelector(
    (state) => ({
      stores: state.root.stores,
      success: state.camera.success,
      errors: state.errors,
    }),
    shallowEqual
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
    [history]
  );
  const handlePopup = (title, message, expired, type) => {
    setInfo({
      title,
      message,
      expired,
      type,
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, expired);
    clearTimeout();
  };
  const onSubmit = useCallback(
    async (values) => {
      source = axios.CancelToken.source();
      const params = {
        ...values,
        store_id: parseInt(values.store_id),
      };

      setLoading(true);
      await dispatch(addCamera(params, source.token, history));

      if (success) {
        handlePopup(
          FACE_R_APP_TITLE,
          "Lưu thông tin camera thành công!",
          2000,
          "success"
        );

        setTimeout(() => {
          setLoading(false);
          history.goBack();
        }, 2000);
      } else setLoading(false);
    },
    [dispatch, history, success]
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />
            <Body stores={stores} goBack={goBack} onSubmit={onSubmit} />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(CreateCamera);
