import React from "react";
import { Box, Typography } from "@mui/material";

const Header = React.memo(() => (
  <Box className="panel-heading">
    <Box className="view-header">
      <Box className="header-icon">
        <i className="pe-7s-pen" />
      </Box>

      <Box className="header-title">
        <Typography variant="h3">
          Đổi mật khẩu
          <Typography component="span">
            <Typography component="small">
              <Typography component="strong">
                  &nbsp;Bạn vui lòng nhập đầy đủ
                <br />
                thông tin phía dưới.
              </Typography>
            </Typography>
          </Typography>
        </Typography>
      </Box>
    </Box>
  </Box>
));

export default Header;
