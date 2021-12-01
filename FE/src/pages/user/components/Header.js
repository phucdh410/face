import React from "react";
import { Link } from "react-router-dom";

export default React.memo(() => {
  return (
    <div className="content-header">
      <div className="header-icon">
        <i className="pe-7s-box1"></i>
      </div>
      <div className="header-title">
        <h1>Người dùng</h1>
        <small>Hiển thị thông tin chi tiết người dùng. </small>

        <ol className="breadcrumb">
          <li>
            <Link to="/users">
              <i className="pe-7s-home"></i> Thông tin người dùng
            </Link>
          </li>
          <li className="active">Chi tiết</li>
        </ol>
      </div>
    </div>
  );
});
