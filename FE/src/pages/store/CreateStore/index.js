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
import useGoBack from "../../../utils/Hooks/useGoBack";
import usePopup from "../../../utils/Hooks/usePopup";
import useOnSubmit from "../hooks/useOnSubmit";

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

  // const handlePopup = (title, message, expired, type, func) => {
  //   setInfo({
  //     title,
  //     message,
  //     expired,
  //     type,
  //   });
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //     if (typeof func === "function") {
  //       func();
  //     }
  //   }, expired * 1.5);
  //   clearTimeout();
  // };

  const goBack = useGoBack();
  const onSubmit = useOnSubmit(source, addStore, errors);

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
