import React from "react";
import PropTypes from "prop-types";

import MenuItem from "../components/MenuItem";

const LeftMenu = React.memo(({ pathname }) => (
  <div className="sidebar" role="navigation">
    <div className="sidebar-nav navbar-collapse">
      <ul className="nav" id="side-menu">
        <li className="nav-heading ">
          <span>Main Navigation&nbsp;&nbsp;&nbsp;&nbsp;------</span>
        </li>

        <MenuItem
          pathname={pathname}
          routename="companies"
          icon="business"
          label="Quản lý doanh nghiệp"
          isActive={pathname.includes("/companies")}
        />

        <MenuItem
          pathname={pathname}
          routename="stores"
          icon="business"
          label="Quản lý cửa hàng"
          isActive={pathname.includes("/stores")}
        />

        <MenuItem
          pathname={pathname}
          routename="depts"
          icon="dns"
          label="Quản lý phòng ban"
          isActive={pathname.includes("/depts")}
        />

        <MenuItem
          pathname={pathname}
          routename="cameras"
          icon="devices_other"
          label="Quản lý camera"
          isActive={pathname === "/" || pathname.includes("/cameras")}
        />

        <MenuItem
          pathname={pathname}
          routename="employees"
          icon="account_box"
          label="Quản lý nhân viên"
          isActive={pathname.includes("/employees")}
        />

        <MenuItem
          pathname={pathname}
          routename="home"
          icon="bubble_chart"
          label="Chấm công"
          isActive={pathname.includes("/home")}
        />

        <MenuItem
          pathname={pathname}
          routename="users"
          icon="person"
          label="Quản lý người dùng"
          isActive={pathname.includes("/users")}
        />

        <MenuItem
          pathname={pathname}
          routename="permissions"
          icon="notifications_active"
          label="Phân quyền người dùng"
          isActive={pathname.includes("/permissions")}
        />

        <MenuItem
          pathname={pathname}
          routename="roles"
          icon="assignment"
          label="Quản lý vai trò"
          isActive={pathname.includes("/roles")}
        />

        <MenuItem
          pathname={pathname}
          routename="facedetect"
          icon="assignment"
          label="Face Detection"
          isActive={pathname.includes("/facedetect")}
        />
        <li>
          <a
            href="#/"
            className="material-ripple"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i className="material-icons">widgets</i>
            Thoát khỏi hệ thống
          </a>
        </li>
      </ul>
    </div>
  </div>
));

LeftMenu.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default LeftMenu;
