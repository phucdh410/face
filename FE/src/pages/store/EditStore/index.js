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
import { getStore, editStore } from "../../../actions/store.actions";
import { LoadingContext } from "../../../context/LoadingContext";
import SuspenseLoading from "../../../components/SuspenseLoading";
import { PopupContext } from "../../../context/PopupContext";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditStore = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      store: state.store.store,
      success: state.store.success,
      errors: state.errors,
    }),
    shallowEqual
  );

  const { success, errors } = state;
  const [store, setStore] = useState(null);

  const handleRequest = useCallback(
    (id) => {
      source = axios.CancelToken.source();
      dispatch(getStore(id, source.token, history));
    },
    [dispatch, history]
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);
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
    }, expired + 3000);
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
    if (state.store && state.store.id.toString() !== id) setStore(state.store);
  }, [state.store]);

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
      await dispatch(editStore(params, source.token, history));

      if (success) {
        handlePopup(
          FACE_R_APP_TITLE,
          "Lưu thông tin cửa hàng thành công!",
          2000,
          "success"
        );
        setTimeout(() => {
          history.goBack();
          setLoading(false);
        }, 2000);
        // } else window.stop_preloader();
      } else setLoading(false);
    },
    [dispatch, history, success]
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {store && (
        <Box className="row">
          <Box className="col-md-12">
            <Box className="panel panel-bd lobidrag">
              <PanelHeading />

              <Body store={store} goBack={goBack} onSubmit={onSubmit} />
            </Box>
          </Box>
        </Box>
      )}
    </Suspense>
  );
});

export default withRouter(EditStore);
