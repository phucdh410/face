import React from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Slide,
  Snackbar,
} from "@mui/material";

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}

const Toast = React.memo(({
  autoHideDuration,
  content,
  open,
  severity,
  horizontal,
  vertical,
  handleClose,
}) => (
  <Snackbar
    anchorOrigin={{ vertical, horizontal }}
    autoHideDuration={autoHideDuration}
    open={open}
    TransitionComponent={SlideTransition}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
      {content}
    </Alert>
  </Snackbar>
));

Toast.propTypes = {
  autoHideDuration: PropTypes.number,
  content: PropTypes.string.isRequired,
  open: PropTypes.bool,
  severity: PropTypes.string,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  autoHideDuration: 6000,
  open: false,
  severity: "success",
  horizontal: "right",
  vertical: "top",
};

export default Toast;
