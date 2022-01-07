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

import { addUser } from "../../../actions/user.actions";
import { FACE_R_APP_TITLE } from "../../../config";
import { LoadingContext } from "../../../context/LoadingContext";
import SuspenseLoading from "../../../components/SuspenseLoading";
import { PopupContext } from "../../../context/PopupContext";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateUser = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { roles, success, errors } = useSelector(
    (state) => ({
      roles: state.root.roles,
      success: state.user.success,
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
        fullname: values.fullname.toUpperCase(),
      };

      setLoading(true);
      await dispatch(
        addUser(params, source.token, history, errors, (_success) => {
          if (_success) {
            handlePopup(
              FACE_R_APP_TITLE,
              "Lưu thông tin người dùng thành công!",
              2000,
              "success",
              () => {
                history.goBack();
                setLoading(false);
              }
            );
          } else {
            handlePopup(FACE_R_APP_TITLE, errors.message, 2000, "error", () => {
              setLoading(false);
            });
          }
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

            <Body roles={roles} goBack={goBack} onSubmit={onSubmit} />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(CreateUser);
