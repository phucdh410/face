import "../styles/custom.css";
import React, { Suspense, lazy } from "react";

import { Box } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { addDept } from "../../../actions/dept.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateDept = React.memo(() => {
  const { stores, success, errors } = useSelector(
    (state) => ({
      stores: state.root.stores,
      success: state.store.success,
      errors: state.errors,
    }),
    shallowEqual
  );

  const goBack = useGoBack();

  const onSubmit = useOnSubmit(source, addDept, errors);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />
            <Body stores={stores} goBack={goBack} onSubmit={onSubmit} />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(CreateDept);
