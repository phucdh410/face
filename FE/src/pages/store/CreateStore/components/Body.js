import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import React from "react";

import { ACTIVES } from "../../../../utils/constants";
import { renderSelect } from "../../../../utils/handler";
import Footer from "./Footer";
import Input from "../../../../components/label/Input";
import List from "../../../../components/label/List";

const validationSchema = yup.object({
  name: yup
    .string("Bạn vui lòng nhập tên cửa hàng.")
    .required("Bạn vui lòng nhập tên cửa hàng."),
  agent: yup
    .string("Bạn vui lòng nhập người đại diện.")
    .required("Bạn vui lòng nhập người đại diện."),
  mobile: yup
    .string("Bạn vui lòng nhập số điện thoại.")
    .required("Bạn vui lòng nhập số điện thoại.")
    .matches(/^[0-9]{10}$/, "Định dạng số điện thoại không hợp lệ"),
  email: yup
    .string("Bạn vui lòng nhập địa chỉ email.")
    .required("Bạn vui lòng nhập địa chỉ email.")
    .matches(
      /^[a-z0-9]+@[a-z]{3,}[.]{1}[a-z]{3}[.]?[a-z]{0,2}$/,
      "Định dạng địa chỉ email không hợp lệ"
    ),
});

const Body = React.memo(({ goBack, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      agent: "",
      mobile: "",
      email: "",
      address: "",
      active: 1,
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Box className="panel-body">
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="name"
          name="name"
          label="Tên cửa hàng (*):"
          placeholder="Nhập tên cửa hàng....."
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="agent"
          name="agent"
          label="Người đại diện (*):"
          placeholder="Nhập người đại diện...."
          type="text"
          value={formik.values.agent}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.agent && Boolean(formik.errors.agent)}
          helperText={formik.touched.agent && formik.errors.agent}
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
          id="address"
          name="address"
          label="Địa chỉ:"
          placeholder="Nhập địa chỉ cửa hàng...."
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          readonly={false}
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
  goBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Body;
