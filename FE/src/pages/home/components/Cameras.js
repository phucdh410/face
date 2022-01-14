/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import axios from "axios";

import {
  CAMERA_CONNECTED,
  CAMERA_CONNECTING,
  CAMERA_DISCONNECTED,
} from "../../../socket/constants";
import { renderPagination } from "../../../utils/handler";
import DataTable from "../../../components/DataTable";
import useCameraStatusChanged from "../hooks/useCameraStatusChanged";
import useRenderCamera from "../hooks/useRenderCamera";
import useRequestCamera from "../hooks/useRequestCamera";
import usePagination from "../../../utils/Hooks/usePagination";

let source = axios.CancelToken.source();

const Cameras = React.memo(({ searchStore, socket }) => {
  const state = useSelector(
    (state) => ({
      currentCamera: state.root.current_camera,
      cameras: state.camera.cameras,
      pages: state.camera.pages,
      page: state.camera.page,
    }),
    shallowEqual
  );

  const { currentCamera, cameras, pages, page } = state;

  const handleRequest = useRequestCamera(searchStore, source);
  const { prev, next } = usePagination(pages, page, handleRequest);
  const renderData = useRenderCamera(cameras, currentCamera, source);

  const onCameraStatusChanged = useCameraStatusChanged(cameras);

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
              headers={["No.", "Livestream", "Host/port", "Khu vực", "Kết nối"]}
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
