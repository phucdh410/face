import "../styles/custom.css";
import React, { Suspense, lazy, useEffect, useCallback, useState } from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getUser, editUser } from "../../../actions/user.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useOnSubmit from "../hooks/useOnSubmit";
import useRequestEdit from "../../../utils/Hooks/useRequestEdit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditUser = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      roles: state.root.roles,
      user: state.user.user,
      success: state.user.success,
      errors: state.errors,
    }),
    shallowEqual
  );

  const { roles, success, errors } = state;
  const [user, setUser] = useState(null);

  const handleRequest = useRequestEdit(source, getUser);

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);

  useEffect(() => {
    if (state.user && state.user.id.toString() === id) {
      setUser({
        ...state.user,
        old_password: state.user ? state.user.password : "",
      });
    }
  }, [state.user]);

  const goBack = useGoBack();

  const onSubmit = useOnSubmit(source, editUser, errors);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {user && (
        <Box className="row">
          <Box className="col-md-12">
            <Box className="panel panel-bd lobidrag">
              <PanelHeading />

              <Body
                user={user}
                roles={roles}
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

export default withRouter(EditUser);
