import React from "react";
import { Box, Typography } from "@mui/material";

export default React.memo(() => (
  <Box className="panel-heading">
    <Box className="view-header">
      <Box className="header-icon">
        <i className="pe-7s-unlock" />
      </Box>
      <Box className="header-title">
        <Typography variant="h3">
          Login
          <Typography variant="h5" component="span">
                &nbsp;Vui lòng sử dụng tài khoản của bạn để truy cập vào hệ thống.
          </Typography>
        </Typography>
      </Box>
    </Box>
  </Box>
));
