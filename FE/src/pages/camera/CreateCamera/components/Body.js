import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useFormik } from "formik";

import * as yup from "yup";

import { ACTIVES } from "../../../../utils/constants";
import { renderSelect } from "../../../../utils/handler";

import Input from "../../../../components/label/Input";
import MaskedInput from "../../../../components/label/MaskedInput";
import List from "../../../../components/label/List";

import Footer from "./Footer";

const validationSchema = yup.object({
  store_id: yup
    .number("Bạn vui lòng chọn cửa hàng.")
    .required("Bạn vui lòng chọn cửa hàng.")
    .moreThan(0, "Bạn vui lòng chọn cửa hàng."),
  description: yup
    .string("Bạn vui lòng nhập vị trí camera.")
    .required("Bạn vui lòng nhập vị trí camera."),
  host: yup
    .string("Bạn vui lòng nhập địa chỉ camera.")
    .required("Bạn vui lòng nhập địa chỉ camera."),
  port: yup
    .number("Bạn vui lòng nhập cổng kết nối camera.")
    .required("Bạn vui lòng nhập cổng kết nối camera.")
    .test("test-port", "Giá trị cổng kết nối camera không hợp lệ.", (value) => {
      const port = parseInt(value);
      if (!isNaN(port)) {
        if (port > 0 && port < 10000) return true;
        return false;
      }

      return false;
    }),
  username: yup
    .string("Bạn vui lòng nhập tài khoản kết nối camera.")
    .required("Bạn vui lòng nhập tài khoản kết nối camera."),
  password: yup
    .string("Bạn vui lòng nhập mật khẩu kết nối camera.")
    .required("Bạn vui lòng nhập mật khẩu kết nối camera."),
  path: yup
    .string("Bạn vui lòng nhập đường dẫn stream camera.")
    .required("Bạn vui lòng nhập vị trí camera."),
});

const Body = React.memo(({ stores, goBack, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      store_id: 0,
      description: "",
      host: "",
      port: "554",
      username: "",
      password: "",
      path: "",
      active: 1,
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Box className="panel-body">
      <form onSubmit={formik.handleSubmit}>
        <List
          id="store_id"
          name="store_id"
          label="Cửa hàng (*):"
          placeholder="Chọn cửa hàng..."
          data={stores}
          defaultValue={0}
          value={formik.values.store_id}
          onChange={formik.handleChange}
          renderItems={renderSelect}
          disabled={false}
          multiple={false}
          error={formik.touched.store_id && Boolean(formik.errors.store_id)}
          helperText={formik.touched.store_id && formik.errors.store_id}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="description"
          name="description"
          label="Vị trí camera (*):"
          placeholder="Nhập vị trí camera....."
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <MaskedInput
          id="host"
          name="host"
          label="Host (*):"
          placeholder="192.168.1.2"
          mask={[
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
            ".",
            /\d/,
            /\d/,
            /\d/,
          ]}
          type="text"
          value={formik.values.host}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.host && Boolean(formik.errors.host)}
          helperText={formik.touched.host && formik.errors.host}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="port"
          name="port"
          label="Port (*):"
          placeholder="RTSP Port default: 554"
          type="text"
          value={formik.values.port}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.port && Boolean(formik.errors.port)}
          helperText={formik.touched.port && formik.errors.port}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="username"
          name="username"
          label="Username (*):"
          placeholder="Username...."
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
          label="Password (*):"
          placeholder="Password...."
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

        <Input
          id="path"
          name="path"
          label="Stream path (*):"
          placeholder="e.g: Stream/Channels/102"
          type="text"
          value={formik.values.path}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.path && Boolean(formik.errors.path)}
          helperText={formik.touched.path && formik.errors.path}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <List
          id="active"
          name="active"
          label="Trạng thái:"
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
  stores: PropTypes.array.isRequired,
  goBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Body;
