import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useFormik } from "formik";

import * as yup from "yup";

import { ACTIVES, GENDERS } from "../../../../utils/constants";
import { renderSelect } from "../../../../utils/handler";

import Input from "../../../../components/label/Input";
import List from "../../../../components/label/List";

import Footer from "./Footer";

const validationSchema = yup.object({
  fullname: yup
    .string("Bạn vui lòng nhập tên người dùng.")
    .required("Bạn vui lòng nhập tên người dùng."),
  mobile: yup
    .string("Bạn vui lòng nhập số điện thoại.")
    .required("Bạn vui lòng nhập số điện thoại.")
    .matches(/^[0-9]{10}$/, "Định dạng số điện thoại không hợp lệ."),
  email: yup
    .string("Bạn vui lòng nhập địa chỉ email.")
    .required("Bạn vui lòng nhập địa chỉ email.")
    .matches(/^[a-z0-9]+@[a-z]{3,}[.]{1}[a-z]{3}[.]?[a-z]{0,2}$/,
      "Định dạng địa chỉ email không hợp lệ."),
  username: yup
    .string("Bạn vui lòng nhập tài khoản kết nối.")
    .required("Bạn vui lòng nhập tài khoản kết nối."),
  password: yup
    .string("Bạn vui lòng nhập mật khẩu kết nối.")
    .required("Bạn vui lòng nhập mật khẩu kết nối."),
  role_id: yup
    .number("Bạn vui lòng nhập vai trò người dùng.")
    .required("Bạn vui lòng nhập vai trò người dùng.")
    .moreThan(0, "Bạn vui lòng nhập vai trò người dùng."),
});

const Body = React.memo(({ roles, goBack, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      mobile: "",
      email: "",
      username: "",
      password: "",
      role_id: 0,
      gender: 0,
      active: 1,
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Box className="panel-body">
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="fullname"
          name="fullname"
          label="Tên người dùng (*):"
          placeholder="Nhập tên người dùng....."
          type="text"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.fullname && Boolean(formik.errors.fullname)}
          helperText={formik.touched.fullname && formik.errors.fullname}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="mobile"
          name="mobile"
          label="Số điện thoại (*):"
          placeholder="Nhập số điện thoại...."
          pattern="[0-9]{10}"
          type="text"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="email"
          name="email"
          label="Email (*):"
          placeholder="Nhập địa chỉ email...."
          pattern="[a-z0-9]+@[a-z]{3,}[.]{1}[a-z]{3}[.]?[a-z]{0,2}"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="username"
          name="username"
          label="Tên đăng nhập (*):"
          placeholder="Nhập tên đăng nhập...."
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="password"
          name="password"
          label="Mật khẩu (*):"
          placeholder="Nhập mật khẩu người dùng...."
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <List
          id="role_id"
          name="role_id"
          label="Vai trò (*):"
          placeholder="Chọn vai trò..."
          data={roles}
          defaultValue={0}
          value={formik.values.role_id}
          onChange={formik.handleChange}
          renderItems={renderSelect}
          disabled={false}
          multiple={false}
          error={formik.touched.role_id && Boolean(formik.errors.role_id)}
          helperText={formik.touched.role_id && formik.errors.role_id}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <List
          id="gender"
          name="gender"
          label="Giới tính"
          placeholder="Chọn giới tính..."
          data={GENDERS}
          value={formik.values.gender}
          onChange={formik.handleChange}
          renderItems={renderSelect}
          disabled={false}
          multiple={false}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <List
          id="active"
          name="active"
          label="Trạng thái"
          placeholder="Chọn trạng thái..."
          data={ACTIVES}
          value={formik.values.active}
          onChange={formik.handleChange}
          renderItems={renderSelect}
          disabled={false}
          multiple={false}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Footer goBack={goBack} />
      </form>
    </Box>
  );
});

Body.propTypes = {
  roles: PropTypes.array.isRequired,
  goBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Body;
