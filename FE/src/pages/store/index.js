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

import { getStores, removeStore } from "../../actions/store.actions";

import {
  prevHandler,
  nextHandler,
  renderPagination,
} from "../../utils/handler";

import { FACE_R_APP_TITLE } from "../../config";
import SuspenseLoading from "../../components/SuspenseLoading";

const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Store = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const state = useSelector(
    (state) => ({
      stores: state.store.stores,
      pages: state.store.pages,
      page: state.store.page,
      success: state.store.success,
      searchInput: state.store.search_input,
      errors: state.errors,
    }),
    shallowEqual,
  );

  const {
    stores, pages, page, success, errors,
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

      dispatch(getStores(params, source.token, history));
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
      await dispatch(removeStore(id, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Xoá thông tin cửa hàng thành công!",
          2000,
          "success",
          () => {
            handleRequest(0, true);
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
    if (stores && stores.length > 0) {
      return stores.map((store, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/stores/edit/${store.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/stores/edit/${store.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {store.name}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 150 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {store.agent}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 150 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {store.email}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 150 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {store.mobile}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {store.address}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {store.active ? (
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
            <a href="#/" onClick={() => onDelete(store.id)}>
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
  }, [stores, onDelete]);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/stores/add")} />

      {/* Search panel */}
      <FilterPanel searchInput={searchInput} onChange={onChange} />

      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin cửa hàng</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Tên cửa hàng",
                  "Người đại diện",
                  "Email",
                  "Số điện thoại",
                  "Địa chỉ",
                  "Trạng thái",
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

Store.displayName = "Store";

export default withRouter(Store);
