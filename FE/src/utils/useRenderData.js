import React, { useCallback } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeCamera } from "../actions/camera.actions";
import { LoadingContext } from "../context/LoadingContext";
import { Link, withRouter } from "react-router-dom";
import { FACE_R_APP_TITLE } from "../config";
import usePopup from "./usePopup";
import axios from "axios";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

let source = axios.CancelToken.source();
const useRenderData = (cameras, handleRequest, errors, pages, page) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();
  const handlePopup = usePopup();
  const { setLoading } = useContext(LoadingContext);

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

  return { renderData, onDelete };
};

export default useRenderData;
