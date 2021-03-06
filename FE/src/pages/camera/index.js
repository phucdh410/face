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

import { getCameras, removeCamera } from "../../actions/camera.actions";
import { getStoresList } from "../../actions/store.actions";
import { getRolesList } from "../../actions/role.actions";

import {
  prevHandler,
  nextHandler,
  renderSelect,
  renderPagination,
} from "../../utils/handler";

import SuspenseLoading from "../../components/SuspenseLoading";

import "./styles/custom.css";

import { FACE_R_APP_TITLE } from "../../config";

const DataTable = lazy(() => import("../../components/DataTable"));

const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Camera = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const state = useSelector(
    (state) => ({
      cameras: state.camera.cameras,
      pages: state.camera.pages,
      page: state.camera.page,
      success: state.camera.success,
      searchStore: state.camera.search_store_id,
      errors: state.errors,
      stores: state.root.stores,
    }),
    shallowEqual,
  );

  const {
    cameras, pages, page, success, errors, stores,
  } = state;

  const [searchStore, setSearchStore] = useState(state.searchStore);

  const getInitialProps = useCallback(() => {
    source = axios.CancelToken.source();

    dispatch(getStoresList(source.token, history));
    dispatch(getRolesList(source.token, history));
  }, [dispatch, history]);

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: searchStore,
        pages,
        page,
      };

      dispatch(getCameras(params, source.token, history));
    },
    [dispatch, history, searchStore],
  );

  useEffect(() => {
    // app.min.js
    window.loading();
    getInitialProps();
    handleRequest(pages, page);

    return () => {
      if (source) source.cancel();
    };
  }, [getInitialProps, handleRequest, page, pages]);

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
      dispatch(removeCamera(id, source.token, history));

      if (success) {
        window.toast(
          FACE_R_APP_TITLE,
          "Xo?? th??ng tin camera th??nh c??ng!",
          2000,
          "success",
          async () => {
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

      setSearchStore(e.target.value);
      handleRequest(0, 0);
    },
    [handleRequest],
  );

  const renderData = useCallback(() => {
    if (cameras && cameras.length > 0) {
      return cameras.map((camera, index) => (
        <TableRow key={index} data-id={camera.id}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/cameras/edit/${camera.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 150 }}>
            <Link to={`/cameras/edit/${camera.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {camera.host}
              </Typography>
            </Link>
          </TableCell>

          <TableCell
            style={{
              width: 150,
              wordBreak: "break-word",
              whiteSpace: "normal",
              textAlign: "center",
            }}
          >
            <Link to={`/cameras/edit/${camera.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {camera.port}
              </Typography>
            </Link>
          </TableCell>

          <TableCell
            style={{
              minWidth: 300,
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            <Typography variant="h5" color={theme.palette.text.primary}>
              {camera.store_name}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography
              variant="h5"
              color={theme.palette.text.primary}
              component="span"
            >
              {camera.path}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 150 }}>
            <Typography
              variant="h5"
              color={theme.palette.text.primary}
              component="span"
            >
              {camera.description}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {camera.status ? (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-success"
              >
                Online
              </Typography>
            ) : (
              <Typography
                variant="h6"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-danger"
              >
                Offline
              </Typography>
            )}
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {camera.active ? (
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
                variant="h6"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-danger"
              >
                Disabled
              </Typography>
            )}
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <a href="#/" onClick={() => onDelete(camera.id)}>
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
  }, [cameras, onDelete]);

  return (
    <Suspense fallback={<SuspenseLoading />}>
      {/* Content header */}
      <MainHeader onClick={() => history.push("/cameras/add")} />

      {/* Search Panel */}
      <FilterPanel
        stores={stores}
        renderStores={renderSelect}
        searchStore={searchStore}
        onChange={(e) => onChange(e)}
      />

      {/* Data container */}
      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Th??ng tin camera</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Host",
                  "Port",
                  "C???a h??ng",
                  "Path",
                  "Khu v???c",
                  "K???t n???i",
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

Camera.displayName = "Camera";

export default withRouter(Camera);
