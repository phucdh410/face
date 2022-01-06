import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeDept } from "../../../actions/dept.actions";
import useOnDelete from "../../../utils/Hooks/useOnDelete";

const useRenderData = (depts, handleRequest, errors, pages, page) => {
  const theme = useTheme();
  const onDelete = useOnDelete(
    removeDept,
    "phòng ban",
    handleRequest,
    errors,
    pages,
    page
  );
  const renderData = useCallback(() => {
    if (depts && depts.length > 0) {
      return depts.map((dept, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/depts/edit/${dept.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/depts/edit/${dept.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {dept.name}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {dept.store_name}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {dept.active ? (
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
            <a href="#/" onClick={() => onDelete(dept.id)}>
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
  }, [depts, onDelete]);

  return renderData;
};

export default useRenderData;
