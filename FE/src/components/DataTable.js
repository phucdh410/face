import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Scrollbar } from "smooth-scrollbar-react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const DataTable = React.memo(({
  headers,
  renderData,
  containerClass,
}) => {
  const theme = useTheme();

  const renderHeaders = useCallback(() => (
    <TableRow>
      {headers.map((header, index) => (
        <TableCell key={index} align="center" component="th">
          <Typography variant="h5" color={theme.palette.success.main} fontWeight={600}>
            {header}
          </Typography>
        </TableCell>
      ))}
    </TableRow>
  ), [headers]);

  const headersMemoize = useMemo(() => renderHeaders(), [renderHeaders]);
  const dataMemoize = useMemo(() => renderData(), [renderData]);

  return (
    <Scrollbar
      plugins={{
        overscroll: {
          effect: "bounce",
        },
      }}
    >
      <Box className={containerClass}>
        <Table id="data" className="table table-bordered table-striped table-hover">
          <TableHead>{headersMemoize}</TableHead>
          <TableBody>{dataMemoize}</TableBody>
        </Table>
      </Box>
    </Scrollbar>
  );
});

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  renderData: PropTypes.func.isRequired,
  containerClass: PropTypes.string,
};

DataTable.defaultProps = {
  containerClass: "data-container table-responsive",
};

export default DataTable;
