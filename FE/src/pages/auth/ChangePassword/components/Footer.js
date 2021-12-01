import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const Footer = React.memo(({ goBack, logoutUser }) => (
  <Box>
    <Button
      type="button"
      className="btn pull-left"
      color="primary"
      size="large"
      variant="contained"
      onClick={logoutUser}
    >
      <Typography variant="h6" component="span">
        Thoát hệ thống
      </Typography>
    </Button>

    <Button
      type="button"
      className="btn pull-right"
      color="primary"
      size="large"
      variant="contained"
      onClick={goBack}
    >
      <Typography variant="h6" component="span">
        Trở về
      </Typography>
    </Button>

    <Button
      type="submit"
      className="btn pull-right m-r-5"
      color="success"
      size="large"
      variant="contained"
    >
      <Typography variant="h6" component="span">
        Đổi mật khẩu
      </Typography>
    </Button>
  </Box>
));

Footer.propTypes = {
  goBack: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default Footer;
