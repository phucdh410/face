/* eslint-disable no-nested-ternary */
import React, { useEffect, useCallback } from "react";
import {
  Box, Button, TableCell, TableRow, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";

import axios from "axios";

import {
  connectToCamera,
  disconnectFromCamera,
  getCameras,
  setCameras,
} from "../../../actions/camera.actions";
import setCurrentCamera from "../../../actions/root.action";

import {
  prevHandler,
  nextHandler,
  renderPagination,
} from "../../../utils/handler";

import ConnectButton from "./ConnectButton";
import Dot from "./Dot";
import DataTable from "../../../components/DataTable";

import { FACE_R_APP_TITLE } from "../../../config";
import {
  CAMERA_CONNECTED,
  CAMERA_CONNECTING,
  CAMERA_DISCONNECTED,
} from "../../../socket/constants";

let source = axios.CancelToken.source();

const Cameras = React.memo(({ searchStore, socket }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();

  const state = useSelector(
    (state) => ({
      currentCamera: state.root.current_camera,
      cameras: state.camera.cameras,
      pages: state.camera.pages,
      page: state.camera.page,
    }),
    shallowEqual,
  );

  const {
    currentCamera, cameras, pages, page,
  } = state;

  const handleRequest = useCallback(
    (pages, page) => {
      source = axios.CancelToken.source();
      const params = {
        store_id: parseInt(searchStore),
        pages,
        page,
      };

      dispatch(getCameras(params, source.token, history));
    },
    [dispatch, history, searchStore],
  );

  const handleLog = useCallback(
    (active, _name) => {
      if (active) {
        const _id = parseInt(_name.split("_")[0]);
        const camera = cameras.find((item) => item.id === _id);

        if (camera) {
          if (camera.status !== 0) {
            dispatch(setCurrentCamera(_name));
          } else {
            window.toast(
              FACE_R_APP_TITLE,
              "Camera no signal. Please come back when it's ready",
              2000,
              "warning",
            );
          }
        } else {
          window.toast(
            FACE_R_APP_TITLE,
            "Camera not found. Please try again!",
            2000,
            "warning",
          );
        }
      } else {
        window.toast(
          FACE_R_APP_TITLE,
          "This camera has been disabled. Please try contact to admin!",
          2000,
          "warning",
        );
      }
    },
    [cameras, dispatch],
  );

  const connect = useCallback(
    (_id) => {
      source = axios.CancelToken.source();
      dispatch(connectToCamera(_id, source.token, history));
    },
    [dispatch, history],
  );

  const disconnect = useCallback(
    (_id) => {
      source = axios.CancelToken.source();
      dispatch(disconnectFromCamera(_id, source.token, history));
    },
    [dispatch, history],
  );

  const handleStatus = useCallback(
    (_id, active, status) => {
      if (active) {
        if (!status) {
          connect(_id);
        } else {
          disconnect(_id);
        }
      } else {
        window.toast(
          FACE_R_APP_TITLE,
          "This camera has been disabled. Please try contact to admin!",
          2000,
          "warning",
        );
      }
    },
    [connect, disconnect],
  );

  const renderData = useCallback(() => {
    if (cameras) {
      let items = [];

      items = cameras.map((camera, index) => {
        const name = `${camera.id}_${camera.description.split(" ").join("_")}`;

        return (
          <TableRow key={index}>
            <TableCell style={{ minWidth: 30, textAlign: "center" }}>{index + 1}</TableCell>

            <TableCell style={{ textAlign: "center" }}>
              <Button
                type="button"
                variant="contained"
                className="btn btn-success btn-rounded w-md m-b-5"
                onClick={() => handleLog(camera.active, name)}
              >
                <Typography variant="h5" component="span">
                  View Camera
                </Typography>
              </Button>
            </TableCell>

            <TableCell style={{ minWidth: 150 }}>
              <Dot value={camera.status} />

              <Typography
                variant="h5"
                color={theme.palette.text.primary}
                component="span"
              >
                {camera.host}
                :
                {camera.port}
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
              <ConnectButton
                value={camera.status}
                handler={() => handleStatus(camera.id, camera.active, camera.status)}
              />
            </TableCell>
          </TableRow>
        );
      });

      return items;
    }

    return null;
  }, [cameras, currentCamera, handleLog, handleStatus]);

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

  const onCameraStatusChanged = useCallback(
    async (payload) => {
      console.log("payload: ", payload);

      const { camera_id: _id, connected } = payload;
      dispatch(setCameras(cameras.map((camera) => (camera.id === _id ? {
        ...camera,
        status: connected,
      } : camera))));
    },
    [cameras, dispatch],
  );

  useEffect(() => {
    socket.on(CAMERA_CONNECTED, onCameraStatusChanged);
    socket.on(CAMERA_CONNECTING, onCameraStatusChanged);
    socket.on(CAMERA_DISCONNECTED, onCameraStatusChanged);

    return () => {
      if (source) source.cancel();
      socket.off(CAMERA_CONNECTED, onCameraStatusChanged);
      socket.off(CAMERA_CONNECTING, onCameraStatusChanged);
      socket.off(CAMERA_DISCONNECTED, onCameraStatusChanged);
    };
  }, [onCameraStatusChanged, socket]);

  useEffect(() => {
    handleRequest(0, 0);
  }, [handleRequest]);

  return (
    <Box className="row">
      <Box className="col-sm-12">
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
                "Livestream",
                "Host/port",
                "Khu vực",
                "Kết nối",
              ]}
              renderData={renderData}
              containerClass="camera-table-container table-responsive"
            />

            {renderPagination(pages, page, prev, next, handleRequest)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default Cameras;
