import React from "react";
import PropTypes from "prop-types";
import {
  Box, Button, Modal, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  outline: 0,
};

const PopupModal = React.memo(({
  hideBackdrop, open, handleLogout, handleClose,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Modal
        hideBackdrop={hideBackdrop}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="modal-dialog" role="document">
            <Box className="modal-content">
              <Box className="modal-header">
                <Typography
                  variant="h3"
                  color={theme.palette.text.secondary}
                  className="modal-title"
                >
                  Ready to Leave?
                </Typography>

                <Button
                  type="button"
                  variant="text"
                  className="close"
                  aria-label="Close"
                >
                  <Typography
                    variant="h6"
                    color={theme.palette.text.primary}
                    component="span"
                    aria-hidden="true"
                  >
                    &times;
                  </Typography>
                </Button>
              </Box>

              <Box className="modal-body">
                <Typography
                  variant="h5"
                  color={theme.palette.text.primary}
                  component="p"
                >
                  Bạn vui lòng nhấn &quot;Logout&quot; nếu bạn đã sẵn sàng thoát khỏi hệ
                  thống.
                </Typography>
              </Box>

              <Box className="modal-footer">
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={handleClose}
                >
                  <Typography
                    variant="h5"
                    component="span"
                  >
                    Thoát
                  </Typography>
                </Button>

                <Button
                  type="button"
                  variant="contained"
                  color="success"
                  sx={{ marginLeft: 5 }}
                  size="large"
                  onClick={handleLogout}
                >
                  <Typography
                    variant="h5"
                    color={theme.palette.text.secondary}
                    component="span"
                  >
                    Logout
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
});

PopupModal.propTypes = {
  hideBackdrop: PropTypes.bool,
  open: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

PopupModal.defaultProps = {
  hideBackdrop: false,
  open: false,
};

export default PopupModal;
