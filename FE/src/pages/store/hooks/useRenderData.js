import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeStore } from "../../../actions/store.actions";
import useOnDelete from "../../../utils/Hooks/useOnDelete";

const useRenderData = (stores, handleRequest, errors, pages, page, source) => {
  const theme = useTheme();
  const onDelete = useOnDelete(
    removeStore,
    "cửa hàng",
    handleRequest,
    errors,
    pages,
    page,
    source
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
  return renderData;
};
export default useRenderData;
