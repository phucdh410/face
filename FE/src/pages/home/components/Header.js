import React from "react";

export default React.memo(() => {
  return (
    <div className="content-header">
      <div className="header-icon">
        <i className="pe-7s-box1"></i>
      </div>
      <div className="header-title">
        <h1>Thông tin chấm công</h1>
        <small>Hiển thị thông tin thời gian nhân viên ra vào. </small>

        <ol className="breadcrumb">
          <li className="active">
            <i className="pe-7s-home"></i> Thông tin chấm công
          </li>
        </ol>
      </div>
    </div>
  );
});
