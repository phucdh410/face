import React, { useCallback } from "react";
import { TableRow, TableCell, Typography, Button } from "@mui/material";
import Dot from "../components/Dot";
import useHandleLog from "./useHandleLog";
import useHandleStatus from "./useHandleStatus";
import { useTheme } from "@mui/material/styles";
import ConnectButton from "../components/ConnectButton";

const useRenderCamera = (cameras, currentCamera, source) => {
  const handleLog = useHandleLog(cameras);
  const handleStatus = useHandleStatus(source);
  const theme = useTheme();
  const renderData = useCallback(() => {
    let items = [];
    if (cameras) {
      items = cameras.map((camera, index) => {
        const name = `${camera.id}_${camera.description.split(" ").join(" ")}`;
        return (
          <TableRow key={index}>
            <TableCell style={{ minWidth: 30, textAlign: "center" }}>
              {index + 1}
            </TableCell>

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
                {camera.host}:{camera.port}
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
                handler={() =>
                  handleStatus(camera.id, camera.active, camera.status)
                }
              />
            </TableCell>
          </TableRow>
        );
      });
      return items;
    }
    return null;
  }, [cameras, currentCamera, handleLog, handleStatus]);
  return renderData;
};

export default useRenderCamera;
