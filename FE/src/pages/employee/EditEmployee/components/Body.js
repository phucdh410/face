import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { isEmpty } from "lodash";

import * as yup from "yup";

import { ACTIVES, GENDERS } from "../../../../utils/constants";
import { renderSelect } from "../../../../utils/handler";

import { convertStringToDate, isValidDate } from "../../../../utils";

import Input from "../../../../components/label/Input";
import MaskedInput from "../../../../components/label/MaskedInput";
import List from "../../../../components/label/List";

import Footer from "./Footer";
import Uploader from "./Uploader";

const validationSchema = yup.object({
  store_id: yup
    .string("Bạn vui lòng chọn cửa hàng!")
    .required("Bạn vui lòng chọn cửa hàng!"),
  fullname: yup
    .string("Bạn vui lòng nhập tên nhân viên!")
    .required("Bạn vui lòng nhập tên nhân viên!"),
  date: yup
    .string("Bạn vui lòng nhập ngày sinh nhân viên!")
    .required("Bạn vui lòng nhập ngày sinh nhân viên!")
    .test("is-date", "Định dạng ngày sinh không hợp lệ.", (value) => {
      if (!isEmpty(value)) {
        const date = convertStringToDate(value);
        if (date) return isValidDate(date);
        return false;
      }

      return false;
    }),
  gender: yup
    .string("Bạn vui lòng chọn giới tính nhân viên!")
    .required("Bạn vui lòng chọn giới tính nhân viên!"),
  mobile: yup
    .string("Bạn vui lòng nhập số điện thoại nhân viên!")
    .required("Bạn vui lòng nhập số điện thoại nhân viên!")
    .matches(/^[0-9]{10}$/, "Định dạng số điện thoại không hợp lệ!"),
});

const Body = React.memo(({
  employee,
  photos,
  faces,
  stores,
  uploadErrors,
  goBack,
  setPhotos,
  onDeleteFace,
  onSubmit,
}) => {
  const formik = useFormik({
    initialValues: {
      ...employee,
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
          label="Cửa hàng (*)"
          placeholder="Chọn cửa hàng..."
          data={stores}
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
          id="fullname"
          name="fullname"
          label="Tên nhân viên (*)"
          placeholder="Nhập tên nhân viên....."
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

        <MaskedInput
          id="date"
          name="date"
          label="Ngày sinh (*):"
          placeholder="dd-mm-yyyy"
          mask={[
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            "-",
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          type="text"
          value={formik.values.date}
          onChange={formik.handleChange}
          readonly={false}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
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
          error={formik.touched.gender && Boolean(formik.errors.gender)}
          helperText={formik.touched.gender && formik.errors.gender}
          containerClass="form-group row"
          controlContainerClass="col-md-12 col-lg-10"
          labelClass="col-md-12 col-lg-2 col-form-label"
        />

        <Input
          id="mobile"
          name="mobile"
          label="Số điện thoại (*)"
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

        <Uploader
          faces={faces}
          photos={photos}
          uploadErrors={uploadErrors}
          setPhotos={setPhotos}
          onDeleteFace={onDeleteFace}
        />

        <Footer goBack={goBack} />
      </form>
    </Box>
  );
});

Body.propTypes = {
  faces: PropTypes.array,
  photos: PropTypes.array,
  stores: PropTypes.array.isRequired,
  goBack: PropTypes.func.isRequired,
  setPhotos: PropTypes.func.isRequired,
  onDeleteFace: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

Body.defaultProps = {
  faces: [],
  photos: [],
};

export default Body;
