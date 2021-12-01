import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ConnectButton = React.memo(({ value, handler }) => {
  const theme = useTheme();

  return (
    <a
      href="#/"
      onClick={handler}
    >
      {value !== 2
        ? value !== 1 ? (
          <Typography
            variant="h6"
            color={theme.palette.text.secondary}
            component="span"
            className="label label-pill label-danger"
          >
            Connect
          </Typography>
        ) : (
          <Typography
            variant="h5"
            color={theme.palette.text.secondary}
            component="span"
            className="label label-pill label-success"
          >
            Disconnect
          </Typography>
        ) : (
          <Typography
            variant="h6"
            color={theme.palette.text.secondary}
            component="span"
            className="label label-pill label-warning"
          >
            Connecting
          </Typography>
        )}
    </a>
  );
});

ConnectButton.propTypes = {
  value: PropTypes.number.isRequired,
  handler: PropTypes.func.isRequired,
};

export default ConnectButton;
