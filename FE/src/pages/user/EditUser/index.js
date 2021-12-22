import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";

import axios from "axios";

import { getUser, editUser } from "../../../actions/user.actions";

import SuspenseLoading from "../../../components/SuspenseLoading";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";
import Loading from "../../../components/Loading/Loading";
import { LoadingContext } from "../../../context/LoadingContext";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditUser = React.memo(() => {
  const { loading, setLoading } = useContext(LoadingContext);
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

  const handleRequest = useCallback(
    async (id) => {
      source = axios.CancelToken.source();
      await dispatch(getUser(id, source.token, history));
    },
    [dispatch, history]
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
    if (state.user && state.user.id.toString() === id) {
      setUser({
        ...state.user,
        old_password: state.user ? state.user.password : "",
      });
    }
  }, [state.user]);

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
        fullname: values.fullname.toUpperCase(),
      };

      // window.start_preloader();
      setLoading(true);
      await dispatch(editUser(params, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Lưu thông tin người dùng thành công!",
          2000,
          "success",
          () => {
            history.goBack();
            // window.stop_preloader();
            setLoading(false);
          }
        );
        // } else window.stop_preloader();
      } else setLoading(false);
    },
    [dispatch, history, success]
  );

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
