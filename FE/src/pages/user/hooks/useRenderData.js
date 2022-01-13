import React, { useCallback } from "react";
import { TableRow, TableCell, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { removeUser } from "../../../actions/user.actions";
import useOnDelete from "../../../utils/Hooks/useOnDelete";

const useRenderData = (users, handleRequest, errors, pages, page, source) => {
  const theme = useTheme();
  const onDelete = useOnDelete(
    removeUser,
    "người dùng",
    handleRequest,
    errors,
    pages,
    page,
    source
  );
  const renderData = useCallback(() => {
    if (users && users.length > 0) {
      return users.map((user, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/users/edit/${user.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/users/edit/${user.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {user.fullname}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.gender ? "Male" : "Female"}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.mobile}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.email}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {user.role_name}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {user.active ? (
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
            <a href="#/" onClick={() => onDelete(user.id)}>
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
  }, [users, onDelete]);
  return renderData;
};

export default useRenderData;
