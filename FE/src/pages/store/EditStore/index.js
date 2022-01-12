import "../styles/custom.css";
import React, { Suspense, lazy, useEffect, useCallback, useState } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getStore, editStore } from "../../../actions/store.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";
import useRequestEdit from "../../../utils/Hooks/useRequestEdit";

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
    shallowEqual
  );

  const { success, errors } = state;
  const [store, setStore] = useState(null);

  const handleRequest = useRequestEdit(source, getStore);

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);

  useEffect(() => {
    if (state.store && state.store.id.toString() === id) setStore(state.store);
  }, [state.store]);

  const goBack = useGoBack();

  const onSubmit = useOnSubmit(source, editStore, errors);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {store && store === state.store && (
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
