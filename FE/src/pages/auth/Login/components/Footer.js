import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default React.memo(() => (
  <Box id="bottom_text">
    <Typography variant="h6" component="span">
      Chưa có tài khoản?
      <Button
        variant="text"
        color="success"
        sx={{
          marginLeft: "5px",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          component="span"
          color="success"
        >
          Đăng ký
        </Typography>
      </Button>
    </Typography>

    <br />

    <Button variant="text" color="success">
      <Typography
        variant="h5"
        fontWeight="bold"
        component="span"
        color="success"
      >
        Quên mật khẩu
      </Typography>
    </Button>
  </Box>
));
