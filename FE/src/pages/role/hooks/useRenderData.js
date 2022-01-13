import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useOnDelete from "../../../utils/Hooks/useOnDelete";
import { removeRole } from "../../../actions/role.actions";

const useRenderData = (roles, handleRequest, errors, pages, page, source) => {
  const theme = useTheme();
  const onDelete = useOnDelete(
    removeRole,
    "vai trò",
    handleRequest,
    errors,
    pages,
    page,
    source
  );
  const renderData = useCallback(() => {
    if (roles && roles.length > 0) {
      return roles.map((role, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/roles/edit/${role.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/roles/edit/${role.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {role.name}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {role.admin ? (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-success"
              >
                Administrator
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color={theme.palette.text.secondary}
                component="span"
                className="label label-pill label-danger"
              >
                Guests
              </Typography>
            )}
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {role.active ? (
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
            <a href="#/" onClick={() => onDelete(role.id)}>
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
  }, [roles, onDelete]);
  return renderData;
};
export default useRenderData;
