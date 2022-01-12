import "../styles/custom.css";
import React, { Suspense, lazy, useEffect, useCallback, useState } from "react";

import _ from "lodash";
import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { getEmployee } from "../../../actions/employee.actions";
import { makeDate } from "../../../utils";
import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useHandleEdit from "../hooks/useHandleEdit";
import useOnDeleteFace from "../hooks/useOnDeleteFace";
import usePrevious from "../../../utils/hooks";

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
    shallowEqual
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
    [dispatch, history]
  );

  useEffect(() => {
    if (!_.isEqual(photos, prevPhotos)) {
      if (prevPhotos) {
        prevPhotos.forEach((file) => URL.revokeObjectURL(file.preview));
      }
    }
  }, [photos, prevPhotos]);

  useEffect(() => {
    // app.min.js
    window.loading();
    handleRequest(id);
  }, [handleRequest, id]);

  useEffect(() => {
    if (state.employee && state.employee.id.toString() === id) {
      setEmployee({
        ...state.employee,
        date: state.employee
          ? makeDate(
              state.employee.birth_day,
              state.employee.birth_month,
              state.employee.birth_year,
              "DD-MM-YYYY"
            )
          : "",
        changed: false,
      });

      setFaces(state.employee.faces || []);
    }
  }, [state.employee]);

  const goBack = useGoBack();

  const onDeleteFace = useOnDeleteFace(
    faces,
    setFaces,
    source,
    faceResponseStatus
  );

  const onSubmit = useHandleEdit(source, errors, photos, id);

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
