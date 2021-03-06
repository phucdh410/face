import React, {
  Suspense, lazy, useEffect, useCallback, useState,
} from "react";
import { Box } from "@mui/material";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";

import axios from "axios";
import _ from "lodash";

import { getEmployee, editEmployee } from "../../../actions/employee.actions";
import removeFace from "../../../actions/face.actions";

import { convertStringToDate, isValidDate, makeDate } from "../../../utils";
import usePrevious from "../../../utils/hooks";

import SuspenseLoading from "../../../components/SuspenseLoading";

import "../styles/custom.css";

import { FACE_R_APP_TITLE } from "../../../config";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditEmployee = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const state = useSelector(
    (state) => ({
      stores: state.root.stores,
      uploadErrors: state.root.upload_file_errors,
      employee: state.employee.employee,
      employeeResponseStatus: state.employee.success,
      faceResponseStatus: state.face.success,
      errors: state.errors,
    }),
    shallowEqual,
  );

  const {
    stores,
    uploadErrors,
    employeeResponseStatus,
    faceResponseStatus,
    errors,
  } = state;

  const [employee, setEmployee] = useState(null);

  const [faces, setFaces] = useState([]);
  const [photos, setPhotos] = useState([]);

  const prevPhotos = usePrevious(photos);

  const handleRequest = useCallback(
    async (id) => {
      source = axios.CancelToken.source();
      await dispatch(getEmployee(id, source.token, history));
    },
    [dispatch, history],
  );

  useEffect(() => {
    if (!_.isEqual(photos, prevPhotos)) {
      if (prevPhotos) { prevPhotos.forEach((file) => URL.revokeObjectURL(file.preview)); }
    }
  }, [photos, prevPhotos]);

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        window.toast(FACE_R_APP_TITLE, errors.message, 4000, "error");
      }
    }

    return () => {
      if (source) source.cancel();
    };
  }, [errors]);

  useEffect(() => {
    if (state.employee && state.employee.id.toString() === id) {
      setEmployee({
        ...state.employee,
        date: state.employee
          ? makeDate(
            state.employee.birth_day,
            state.employee.birth_month,
            state.employee.birth_year,
            "DD-MM-YYYY",
          )
          : "",
        changed: false,
      });

      setFaces(state.employee.faces || []);
    }
  }, [state.employee]);

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      history.goBack();
    },
    [history],
  );

  const onDeleteFace = useCallback(
    async (face) => {
      const index = faces.findIndex((face) => face.id === face);
      faces[index].loading = true;

      setFaces(faces);

      await dispatch(removeFace(face, source.token, history));

      if (faceResponseStatus) faces.splice(index, 1);
      else faces[index].loading = false;

      setFaces(faces);
    },
    [dispatch, employee, faceResponseStatus, history],
  );

  const onSubmit = useCallback(
    async (values) => {
      const date = convertStringToDate(values.date);

      if (isValidDate(date)) {
        source = axios.CancelToken.source();
        const params = new FormData();

        for (let index = 0; index < photos.length; index++) {
          params.append("file", photos[index]);
        }

        params.append("store_id", parseInt(values.store_id));
        params.append("fullname", values.fullname.toUpperCase());
        params.append("date", date);
        params.append("gender", parseInt(values.gender));
        params.append("mobile", values.mobile);
        params.append("avatar", values.avatar);
        params.append("active", values.active);
        params.append("changed", values.changed ? 1 : 0);

        window.start_preloader();
        await dispatch(editEmployee(id, params, source.token, history));

        if (employeeResponseStatus) {
          setPhotos([]);

          window.toast(
            FACE_R_APP_TITLE,
            "L??u th??ng tin nh??n vi??n th??nh c??ng!",
            2000,
            "success",
            () => {
              history.replace("/employees");
              window.stop_preloader();
            },
          );
        } else window.stop_preloader();
      } else {
        window.toast(
          FACE_R_APP_TITLE,
          "?????nh d???ng ng??y sinh kh??ng h???p l???!",
          4000,
          "warning",
          () => {
            window.stop_preloader();
          },
        );
      }
    },
    [dispatch, employeeResponseStatus, history, id, photos],
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      {employee && (
      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />
            <Body
              employee={employee}
              faces={faces}
              photos={photos}
              stores={stores}
              uploadErrors={uploadErrors}
              goBack={goBack}
              setPhotos={setPhotos}
              onDeleteFace={onDeleteFace}
              onSubmit={onSubmit}
            />
          </Box>
        </Box>
      </Box>
      )}
    </Suspense>
  );
});

export default withRouter(EditEmployee);
