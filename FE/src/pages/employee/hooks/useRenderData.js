import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { removeEmployee } from "../../../actions/employee.actions";
import useOnDelete from "../../../utils/Hooks/useOnDelete";

const useRenderData = (
  employees,
  handleRequest,
  errors,
  pages,
  page,
  source
) => {
  const theme = useTheme();
  const onDelete = useOnDelete(
    removeEmployee,
    "nhân viên",
    handleRequest,
    errors,
    pages,
    page,
    source
  );
  const renderData = useCallback(() => {
    if (employees && employees.length > 0) {
      return employees.map((employee, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: 30, textAlign: "center" }}>
            <Link to={`/employees/edit/${employee.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {index + 1}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Link to={`/employees/edit/${employee.id}`}>
              <Typography variant="h5" color={theme.palette.success.main}>
                {employee.fullname}
              </Typography>
            </Link>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {employee.gender ? "Male" : "Female"}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {employee.mobile}
            </Typography>
          </TableCell>

          <TableCell style={{ minWidth: 200 }}>
            <Typography variant="h5" color={theme.palette.text.primary}>
              {employee.store_name}
            </Typography>
          </TableCell>

          <TableCell style={{ textAlign: "center" }}>
            {employee.active ? (
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
            <a href="#/" onClick={() => onDelete(employee.id)}>
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
  }, [employees, onDelete]);

  return renderData;
};

export default useRenderData;
