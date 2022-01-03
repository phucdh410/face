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
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { addStore } from "../../../actions/store.actions";
import { FACE_R_APP_TITLE } from "../../../config";
import { LoadingContext } from "../../../context/LoadingContext";
import SuspenseLoading from "../../../components/SuspenseLoading";
import { PopupContext } from "../../../context/PopupContext";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateStore = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { success, errors } = useSelector(
    (state) => ({
      success: state.store.success,
      errors: state.errors,
    }),
    shallowEqual
  );
  const handlePopup = (title, message, expired, type, func) => {
    setInfo({
      title,
      message,
      expired,
      type,
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (typeof func === "function") {
        func();
      }
    }, expired * 1.5);
    clearTimeout();
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        handlePopup(FACE_R_APP_TITLE, errors.message, 4000, "error");
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

  const onSubmit = useCallback(
    async (values) => {
      source = axios.CancelToken.source();
      const params = {
        ...values,
        name: values.name.toUpperCase(),
        agent: values.agent.toUpperCase(),
        address: values.address ? values.address.toUpperCase() : "",
      };

      // window.start_preloader();
      setLoading(true);
      await dispatch(
        addStore(params, source.token, history, (_success) => {
          if (_success) {
            handlePopup(
              FACE_R_APP_TITLE,
              "Lưu thông tin cửa hàng thành công!",
              2000,
              "success",
              () => {
                history.goBack();
                setLoading(false);
              }
            );
            // } else window.stop_preloader();
          } else setLoading(false);
        })
      );
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
            <Body goBack={goBack} onSubmit={onSubmit} />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(CreateStore);
