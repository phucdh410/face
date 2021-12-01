import React from "react";
import { Link } from "react-router-dom";

export default React.memo(() => {
  return (
    <div className="content-header">
      <div className="header-icon">
        <i className="pe-7s-box1"></i>
      </div>
      <div className="header-title">
        <h1>Nhân viên</h1>
        <small>Hiển thị thông tin chi tiết nhân viên. </small>

        <ol className="breadcrumb">
          <li>
            <Link to="/employees">
              <i className="pe-7s-home"></i> Thông tin nhân viên
            </Link>
          </li>
          <li className="active">Chi tiết</li>
        </ol>
      </div>
    </div>
  );
});
