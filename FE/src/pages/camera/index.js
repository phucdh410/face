import "./styles/custom.css";
import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

import {
  prevHandler,
  nextHandler,
  renderSelect,
  renderPagination,
} from "../../utils/handler";
import { FACE_R_APP_TITLE } from "../../config";
import { getCameras, removeCamera } from "../../actions/camera.actions";
import { getRolesList } from "../../actions/role.actions";
import { getStoresList } from "../../actions/store.actions";
import { LoadingContext } from "../../context/LoadingContext";
import { PopupContext } from "../../context/PopupContext";
import SuspenseLoading from "../../components/SuspenseLoading";
import useInitialProps from "../../utils/useInitialProps";
import useHandleRequest from "../../utils/useHandleRequest";
import usePrev from "../../utils/usePrev";
import useNext from "../../utils/useNext";
import usePopup from "../../utils/usePopup";

const DataTable = lazy(() => import("../../components/DataTable"));
const MainHeader = lazy(() => import("./components/MainHeader"));
const FilterPanel = lazy(() => import("./components/FilterPanel"));

let source = axios.CancelToken.source();

const Camera = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const getInitialProps = useInitialProps(source, dispatch, history);
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
    shallowEqual
  );

  const { cameras, pages, page, success, errors, stores } = state;
  const [searchStore, setSearchStore] = useState(state.searchStore);

  const handleRequest = useHandleRequest(
    source,
    dispatch,
    searchStore,
    history
  );

  const handlePopup = usePopup(setShowPopup, setInfo);
  // const handlePopup = (title, message, expired, type, func) => {
  //   setInfo({
  //     title,
  //     message,
  //     expired,
  //     type,
  //   });
  //   setShowPopup(true);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //     if (typeof func === "function") {
  //       func();
  //     }
  //   }, expired * 1.5);
  //   clearTimeout();
  // };

  useEffect(() => {
    // app.min.js
    window.loading();
    getInitialProps();
    handleRequest(pages, page);
    return () => {
      if (source) source.cancel();
    };
  }, [getInitialProps, handleRequest, page, pages]);

  const prev = usePrev(pages, page, handleRequest);
  const next = useNext(pages, page, handleRequest);

  const onDelete = useCallback(
    async (id) => {
      setLoading(true);
      source = axios.CancelToken.source();
      await dispatch(
        removeCamera(id, source.token, history, errors, (_success) => {
          if (_success) {
            handlePopup(
              FACE_R_APP_TITLE,
              "Xoá thông tin camera thành công!",
              2000,
              "success",
              async () => {
                handleRequest(pages, page);
                setLoading(false);
              }
            );
          } else {
            handlePopup(FACE_R_APP_TITLE, errors.message, 2000, "error", () => {
              setLoading(false);
            });
          }
        })
      );
    },
    [dispatch, handleRequest, history]
  );

  const onChange = useCallback(
    (e) => {
      e.preventDefault();

      setSearchStore(e.target.value);
      handleRequest(0, 0);
    },
    [handleRequest]
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
      {/* <Loading /> */}
      <Box className="row">
        <Box className="col-sm-12 p-0">
          <Box className="panel panel-bd lobidrag">
            <Box className="panel-heading">
              <Box className="panel-title">
                <Typography variant="h4">Thông tin camera</Typography>
              </Box>
            </Box>

            <Box className="panel-body">
              <DataTable
                headers={[
                  "No.",
                  "Host",
                  "Port",
                  "Cửa hàng",
                  "Path",
                  "Khu vực",
                  "Kết nối",
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

Camera.displayName = "Camera";

export default withRouter(Camera);
