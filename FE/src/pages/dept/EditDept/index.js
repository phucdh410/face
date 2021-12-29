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
  console.log(state);
  const { stores, success, errors } = state;
  console.log(success);
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
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        handlePopup(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }

    return () => {
      if (source) source.cancel();
    };
  }, [errors]);

  useEffect(() => {
    if (state.dept !== dept) setDept(state.dept);
  }, [state.dept]);

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
      };

      // window.start_preloader();
      setLoading(true);
      await dispatch(editDept(params, source.token, history));

      if (success) {
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
        // } else window.stop_preloader();
      } else setLoading(false);
    },
    [dispatch, history, dept, success]
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
