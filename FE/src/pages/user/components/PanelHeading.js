import React from "react";
import { Box, Typography } from "@mui/material";

export default React.memo(() => (
  <Box className="panel-heading">
    <Box className="view-header">
      <Box className="header-icon">
        <i className="pe-7s-unlock" />
      </Box>
      <Box className="header-title">
        <Typography variant="h6" component="small">
          <Typography variant="h6" component="strong" fontWeight="bold">
              &nbsp;Bạn vui lòng vui lòng nhập đầy đủ thông tin bắt buộc (*).
          </Typography>
        </Typography>
      </Box>
    </Box>
  </Box>
));
