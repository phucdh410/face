import "../styles/custom.css";
import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import _ from "lodash";
import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory, useParams } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { convertStringToDate, isValidDate, makeDate } from "../../../utils";
import { FACE_R_APP_TITLE } from "../../../config";
import { getEmployee, editEmployee } from "../../../actions/employee.actions";
import { LoadingContext } from "../../../context/LoadingContext";
import removeFace from "../../../actions/face.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import usePrevious from "../../../utils/hooks";
import { PopupContext } from "../../../context/PopupContext";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useHandleEdit from "../hooks/useHandleEdit";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const EditEmployee = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
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
    [dispatch, employee, faceResponseStatus, history]
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
