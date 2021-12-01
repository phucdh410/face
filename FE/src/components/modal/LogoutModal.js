import React from "react";
import PropTypes from "prop-types";

const LogoutModal = React.memo(({ logoutUser }) => {
  return (
    <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Ready to Leave?</h1>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <p>
              Bạn vui lòng nhấn "Logout" nếu bạn đã sẵn sàng thoát khỏi hệ
              thống.
            </p>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
            >
              Thoát
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-dismiss="modal"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

LogoutModal.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default LogoutModal;
