import React from "react";
import {
  Box, Typography,
} from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";

import { FACE_R_APP_DOMAIN } from "../../../config";

const Live = React.memo(() => {
  const { currentCamera } = useSelector(
    (state) => ({
      currentCamera: state.root.current_camera,
    }),
    shallowEqual,
  );

  const minHeight = currentCamera && currentCamera.length > 0 ? "0px" : "350px";

  return (
    <Box className="panel panel-bd lobidrag">
      <Box className="panel-heading">
        <Box className="panel-title">
          <Typography variant="h4">Thông tin camera</Typography>
        </Box>
      </Box>

      <Box className="panel-body" style={{ minHeight }}>
        {currentCamera && currentCamera.length > 0 && (
          <img
            alt="live-webcam"
            className="img-responsive"
            src={`${FACE_R_APP_DOMAIN}/video_feed/${currentCamera}`}
            style={{ width: "100%" }}
          />
        )}
      </Box>
    </Box>
  );
});

export default Live;
