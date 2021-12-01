import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import { Email as EmailIcon, VpnKey as VpnKeyIcon } from "@mui/icons-material";
import { useFormik } from "formik";

import * as yup from "yup";

import Input from "../../../../components/label/Input";

const validationSchema = yup.object({
  email: yup
    .string("Bạn vui lòng nhập thông tin truy cập!")
    .required("Bạn vui lòng nhập thông tin truy cập!"),
  password: yup
    .string("Bạn vui lòng nhập mật khẩu!")
    .required("Bạn vui lòng nhập mật khẩu!"),
});

const Body = React.memo(({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: "admin@spaceaa.com",
      password: "@dm1n123",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Box className="panel-body">
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          placeholder="Bạn vui lòng nhập thông tin kết nối"
          name="email"
          type="text"
          label="E-mail"
          icon={<EmailIcon />}
          defaultValue="admin@spaceaa.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          containerClass="form-group row"
          controlContainerClass="col-md-12"
          labelClass="col-md-12 col-form-label"
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          message={formik.touched.oldPassword && formik.errors.oldPassword}
        />

        <Input
          id="password"
          placeholder="Bạn vui lòng nhập mật khẩu kết nối"
          name="password"
          type="password"
          label="Mật khẩu"
          icon={<VpnKeyIcon />}
          defaultValue="@dm1n123"
          value={formik.values.password}
          onChange={formik.handleChange}
          containerClass="form-group row"
          controlContainerClass="col-md-12"
          labelClass="col-md-12 col-form-label"
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          message={formik.touched.oldPassword && formik.errors.oldPassword}
        />

        <Box>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className="pull-right"
          >
            <Typography variant="h6" component="span">
              Login
            </Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
});

Body.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Body;
