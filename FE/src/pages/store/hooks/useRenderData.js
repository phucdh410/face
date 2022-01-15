import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const useRenderData = (stores, onDelete) => {
  const theme = useTheme();
  const data = useMemo(() => {
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
  }, [stores]);
  return data;
};
export default useRenderData;
