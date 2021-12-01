import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useFormik } from "formik";

import * as yup from "yup";

import { ACTIVES, USERGROUPS } from "../../../../utils/constants";
import { renderSelect } from "../../../../utils/handler";

import Input from "../../../../components/label/Input";
import List from "../../../../components/label/List";

import Footer from "./Footer";

const validationSchema = yup.object({
  name: yup
    .string("Bạn vui lòng nhập tên vai trò người dùng.")
    .required("Bạn vui lòng nhập tên vai trò người dùng."),
});

const Body = React.memo(({ goBack, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      admin: 0,
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
          label="Tên vai trò (*):"
          placeholder="Nhập tên vai trò người dùng....."
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

        <List
          id="admin"
          name="admin"
          label="Nhóm vai trò (*):"
          placeholder="Chọn nhóm vai trò người dùng..."
          data={USERGROUPS}
          value={formik.values.admin}
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
