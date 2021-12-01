import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const Footer = React.memo(({ goBack }) => (
  <Box className="form-group row">
    <Box className="col-sm-12">
      <Button
        type="button"
        variant="contained"
        size="large"
        className="btn btn-primary pull-right"
        onClick={goBack}
      >
        <Typography variant="h6" component="span">
          Thoát
        </Typography>
      </Button>

      <Button
        type="submit"
        variant="contained"
        size="large"
        className="btn btn-success pull-right m-r-5"
      >
        <Typography variant="h6" component="span">
          Lưu thông tin
        </Typography>
      </Button>
    </Box>
  </Box>
));

Footer.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default Footer;
