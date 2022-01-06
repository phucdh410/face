import React, { useCallback } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { removeCamera } from "../../../actions/camera.actions";
import useOnDelete from "../../../utils/Hooks/useOnDelete";

const useRenderData = (cameras, handleRequest, errors, pages, page) => {
  const theme = useTheme();
  const onDelete = useOnDelete(
    removeCamera,
    "thiết bị",
    handleRequest,
    errors,
    pages,
    page
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
  });

  return renderData;
};

export default useRenderData;
