import "../styles/custom.css";
import React, { Suspense, lazy } from "react";

import { Box } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { addStore } from "../../../actions/store.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateStore = React.memo(() => {
  const { success, errors } = useSelector(
    (state) => ({
      success: state.store.success,
      errors: state.errors,
    }),
    shallowEqual
  );

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
