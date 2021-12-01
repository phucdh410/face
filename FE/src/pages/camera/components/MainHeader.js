import React from "react";
import PropTypes from "prop-types";
import {
  Box, Button, Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";

const MainHeader = React.memo(({ onClick }) => {
  const theme = useTheme();

  return (
    <>
      <Box className="content-header">
        <Box className="header-icon">
          <Typography
            variant="h1"
            color={theme.palette.success.main}
            component="i"
            fontFamily="Pe-icon-7-stroke"
            className="pe-7s-box1"
          />
        </Box>

        <Box
          className="header-title"
          paddingLeft={5}
        >
          <Typography
            variant="h1"
            color={theme.palette.text.secondary}
          >
            Thiết bị
          </Typography>

          <Typography
            variant="h6"
            color={theme.palette.text.primary}
            fontWeight={600}
            paddingX={2}
          >
            Hiển thị thông tin liên quan đến thiết bị.
          </Typography>

          <ol className="breadcrumb">
            <li className="active">
              <Typography
                variant="h6"
                color={theme.palette.success.main}
                component="i"
                fontFamily="Pe-icon-7-stroke"
                className="pe-7s-home"
              />
              Thông tin thiết bị
            </li>
          </ol>
        </Box>
      </Box>

      <Box
        id="add-device-container"
        className="row ml-0 mr-0"
      >
        <Button
          color="primary"
          variant="contained"
          className="btn btn-labeled btn-primary sm-float-left md-float-right m-b-10"
          startIcon={<AddIcon />}
          onClick={onClick}
        >
          <Typography
            variant="h6"
            color={theme.palette.text.secondary}
          >
            Thêm thiết bị
          </Typography>
        </Button>
      </Box>
    </>
  );
});

MainHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
};

MainHeader.displayName = "MainHeader";

export default MainHeader;
