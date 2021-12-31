import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Breadcrum = React.memo(() => {
  const theme = useTheme();

  return (
    <Box className="content-header">
      <Box className="header-icon">
        <i className="pe-7s-box1" />
      </Box>
      <Box className="header-title">
        <Typography variant="h1" color={theme.palette.text.secondary}>
          Nhân viên
        </Typography>

        <Typography
          variant="h6"
          color={theme.palette.text.primary}
          component="small"
        >
          Hiển thị thông tin chi tiết nhân viên.
        </Typography>

        <ol className="breadcrumb">
          <li>
            <Link to="/cameras">
              <i className="pe-7s-home" />
              Thông tin nhân viên
            </Link>
          </li>
          <li className="active">Chi tiết</li>
        </ol>
      </Box>
    </Box>
  );
});

Breadcrum.displayName = "Breadcrum";

export default Breadcrum;
