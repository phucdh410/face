import React, {
  Suspense, lazy, useEffect, useCallback, useState,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";

import axios from "axios";

import { getStore, editStore } from "../../../actions/store.actions";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";
import SuspenseLoading from "../../../components/SuspenseLoading";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditStore = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      store: state.store.store,
      success: state.store.success,
      errors: state.errors,
    }),
    shallowEqual,
  );

  const { success, errors } = state;
  const [store, setStore] = useState(null);

  const handleRequest = useCallback(
    (id) => {
      source = axios.CancelToken.source();
      dispatch(getStore(id, source.token, history));
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
    if (state.store && state.store.id.toString() !== id) setStore(state.store);
  }, [state.store]);

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
        name: values.name.toUpperCase(),
        agent: values.agent.toUpperCase(),
        address: values.address ? values.address.toUpperCase() : "",
      };

      window.start_preloader();
      await dispatch(editStore(params, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "L??u th??ng tin c???a h??ng th??nh c??ng!",
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

      {store && (
      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />

            <Body
              store={store}
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

export default withRouter(EditStore);
