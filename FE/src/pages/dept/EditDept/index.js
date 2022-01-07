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
import { getDept, editDept } from "../../../actions/dept.actions";
import { LoadingContext } from "../../../context/LoadingContext";
import SuspenseLoading from "../../../components/SuspenseLoading";
import { PopupContext } from "../../../context/PopupContext";
import useGoBack from "../../../utils/Hooks/useGoBack";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditDept = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      stores: state.root.stores,
      dept: state.dept.dept,
      success: state.dept.success,
      errors: state.errors,
    }),
    shallowEqual
  );
  const { stores, success, errors } = state;
  const [dept, setDept] = useState(null);

  const handleRequest = useCallback(
    (id) => {
      source = axios.CancelToken.source();
      dispatch(getDept(id, source.token, history));
    },
    [dispatch, history]
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);

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
    if (state.dept !== dept) setDept(state.dept);
  }, [state.dept]);

  const goBack = useGoBack();

  const onSubmit = useCallback(
    async (values) => {
      source = axios.CancelToken.source();
      const params = {
        ...values,
        name: values.name.toUpperCase(),
      };

      setLoading(true);
      await dispatch(
        editDept(params, source.token, history, errors, (_success) => {
          if (_success) {
            handlePopup(
              FACE_R_APP_TITLE,
              "Lưu thông tin phòng ban thành công!",
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
    [dispatch, history, dept]
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {dept && (
        <Box className="row">
          <Box className="col-md-12">
            <Box className="panel panel-bd lobidrag">
              <PanelHeading />
              <Body
                dept={dept}
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

export default withRouter(EditDept);
