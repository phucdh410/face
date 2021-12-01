import React from "react";
import { Link } from "react-router-dom";

export default React.memo(() => {
  return (
    <div className="content-header">
      <div className="header-icon">
        <i className="pe-7s-box1"></i>
      </div>
      <div className="header-title">
        <h1>Vai trò người dùng</h1>
        <small>Hiển thị thông tin chi tiết vai trò người dùng. </small>

        <ol className="breadcrumb">
          <li>
            <Link to="/roles">
              <i className="pe-7s-home"></i> Vai trò người dùng
            </Link>
          </li>
          <li className="active">Chi tiết</li>
        </ol>
      </div>
    </div>
  );
});
