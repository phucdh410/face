import React, {
  Suspense, lazy, useEffect, useCallback, useState,
} from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Box, TableCell, TableRow, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";

import { getUsers, removeUser } from "../../actions/user.actions";

import {
  prevHandler,
  nextHandler,
  renderPagination,
} from "../../utils/handler";

import SuspenseLoading from "../../components/SuspenseLoading";

import "./styles/custom.css";

import { FACE_R_APP_TITLE } from "../../config";

const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const User = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const state = useSelector(
    (state) => ({
      users: state.user.users,
      pages: state.user.pages,
      page: state.user.page,
      success: state.user.success,
      searchInput: state.user.search_input,
      errors: state.errors,
    }),
    shallowEqual,
  );

  const {
    users, pages, page, success, errors,
  } = state;

  const [searchInput, setSearcInput] = useState(state.searchInput);

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        input: searchInput,
        pages,
        page,
      };

      dispatch(getUsers(params, source.token, history));
    },
    [dispatch, history, searchInput],
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(pages, page);

    return () => {
      if (source) source.cancel();
    };
  }, [handleRequest, page, pages]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        window.toast(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }
  }, [errors]);

  const prev = useCallback(
    (e) => {
      prevHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages],
  );

  const next = useCallback(
    (e) => {
      nextHandler(e, pages, page, handleRequest);
    },
    [handleRequest, page, pages],
  );

  const onDelete = useCallback(
    async (id) => {
      window.start_preloader();
      source = axios.CancelToken.source();
      await dispatch(removeUser(id, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Xo?? th??ng tin ng?????i d??ng th??nh c??ng!",
          2000,
          "success",
          () => {
            handleRequest(0, 0);
            window.stop_preloader();
          },
        );
      } else window.stop_preloader();
    },
    [dispatch, handleRequest, history, success],
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      setSearcInput(e.target.value);
      handleRequest(0, 0);
    },
    [handleRequest],
  );

  const renderData = useCallback(() => {
    if (users && users.length > 0) {
      return users.map((user, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/users/edit/${user.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/users/edit/${user.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {user.fullname}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.gender ? "Male" : "Female"}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.mobile}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.email}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.role_name}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {user.active ? (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-success"
              >
                Active
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-danger"
              >
                Disabled
              </Typography>
            )}
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <a href="#/" onClick={() => onDelete(user.id)}>
              <Typography
                variant="h5"
                color={theme.palette.success.main}
                component="i"
                fontFamily="Glyphicons Halflings"
                className="glyphicon glyphicon-erase"
              />
            </a>
          </TableCell>
        </TableRow>
      ));
    }

    return null;
  }, [users, onDelete]);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/users/add")} />

      {/* Search panel */}
      <FilterPanel searchInput={searchInput} onChange={onChange} />

      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Th??ng tin ng?????i d??ng</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "T??n ng?????i d??ng",
                  "Doanh nghi???p",
                  "C???a h??ng",
                  "S??? ??i???n tho???i",
                  "Email",
                  "Nh??m ng?????i d??ng",
                  "Tr???ng th??i",
                  "",
                ]}
                renderData={renderData}
              />

              {renderPagination(pages, page, prev, next, handleRequest)}
            </Box>
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(User);
