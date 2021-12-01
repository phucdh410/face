import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { VpnKey as VpnKeyIcon } from "@mui/icons-material";
import { Form, useFormik } from "formik";

import * as yup from "yup";

import Input from "../../../../components/label/Input";
import Footer from "./Footer";

const validationSchema = yup.object({
  oldPassword: yup
    .string("Bạn vui lòng nhập mật khẩu cũ!")
    .required("Bạn vui lòng nhập mật khẩu cũ!"),
  newPassword: yup
    .string("Bạn vui lòng nhập mật khẩu mới!")
    .min(8, "Mật khẩu tổi thiểu 8 kí tự!")
    .required("Bạn vui lòng nhập mật khẩu mới!"),
  confirmPassword: yup
    .string("Bạn vui lòng xác nhận mật khẩu!")
    .oneOf([yup.ref("newPassword"), null], "Xác nhận mật khẩu không hợp lệ!"),
});

const Body = React.memo(({ goBack, logoutUser, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Box className="panel-body">
      <Form
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <Input
          id="oldPassword"
          placeholder="*********************"
          name="oldPassword"
          type="password"
          label="Mật khẩu hiện tại"
          icon={<VpnKeyIcon />}
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          message={formik.touched.oldPassword && formik.errors.oldPassword}
        />

        <Input
          id="new_password"
          placeholder="*********************"
          name="new_password"
          type="password"
          label="Mật khẩu mới"
          icon={<VpnKeyIcon />}
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          message={formik.touched.oldPassword && formik.errors.oldPassword}
        />

        <Input
          id="confirm_password"
          placeholder="*********************"
          name="confirm_password"
          type="password"
          label="Xác nhận mật khẩu"
          icon={<VpnKeyIcon />}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          message={formik.touched.oldPassword && formik.errors.oldPassword}
        />

        <Footer
          goBack={goBack}
          logoutUser={logoutUser}
        />
      </Form>
    </Box>
  );
});

Body.propTypes = {
  goBack: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Body;
