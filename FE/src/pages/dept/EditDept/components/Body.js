import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useFormik } from "formik";

import * as yup from "yup";

import { ACTIVES } from "../../../../utils/constants";
import { renderSelect } from "../../../../utils/handler";

import Input from "../../../../components/label/Input";
import List from "../../../../components/label/List";

import Footer from "./Footer";

const validationSchema = yup.object({
  name: yup
    .string("Bạn vui lòng nhập tên phòng ban!")
    .required("Bạn vui lòng nhập tên phòng ban!"),
  store_id: yup
    .number("Bạn vui lòng chọn cửa hàng.")
    .required("Bạn vui lòng chọn cửa hàng.")
    .moreThan(0, "Bạn vui lòng chọn cửa hàng."),
});

const Body = React.memo(({
  dept, stores, goBack, onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      ...dept,
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
          placeholder="Nhập tên phòng ban....."
          label="Tên phòng ban (*):"
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
  dept: PropTypes.object.isRequired,
  stores: PropTypes.array.isRequired,
  goBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Body;
