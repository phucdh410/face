import "../styles/custom.css";
import React, { Suspense, lazy } from "react";

import { useSelector, shallowEqual } from "react-redux";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { addUser } from "../../../actions/user.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateUser = React.memo(() => {
  const { roles, success, errors } = useSelector(
    (state) => ({
      roles: state.root.roles,
      success: state.user.success,
      errors: state.errors,
    }),
    shallowEqual
  );

  const goBack = useGoBack();

  const onSubmit = useOnSubmit(source, addUser, errors);

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
