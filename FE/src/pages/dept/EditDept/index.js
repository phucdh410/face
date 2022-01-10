import "../styles/custom.css";
import React, { Suspense, lazy, useEffect, useCallback, useState } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getDept, editDept } from "../../../actions/dept.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditDept = React.memo(() => {
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

  useEffect(() => {
    if (state.dept !== dept) setDept(state.dept);
  }, [state.dept]);

  const goBack = useGoBack();

  const onSubmit = useOnSubmit(source, editDept, errors);

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
