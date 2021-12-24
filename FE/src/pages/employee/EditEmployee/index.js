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
  const handlePopup = (title, message, expired, type) => {
    setInfo({
      title,
      message,
      expired,
      type,
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, expired);
    clearTimeout();
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      if (errors.message) {
        handlePopup(FACE_R_APP_TITLE, errors.message, 4000, "error");
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
              "DD-MM-YYYY"
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
    [history]
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
    [dispatch, employee, faceResponseStatus, history]
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

        // window.start_preloader();
        setLoading(true);
        await dispatch(editEmployee(id, params, source.token, history));

        if (employeeResponseStatus) {
          setPhotos([]);

          handlePopup(
            FACE_R_APP_TITLE,
            "Lưu thông tin nhân viên thành công!",
            2000,
            "success",
            () => {
              history.replace("/employees");
              // window.stop_preloader();
              setLoading(false);
            }
          );
          // } else window.stop_preloader();
        } else setLoading(false);
      } else {
        handlePopup(
          FACE_R_APP_TITLE,
          "Định dạng ngày sinh không hợp lệ!",
          4000,
          "warning",
          () => {
            // window.stop_preloader();
            setLoading(false);
          }
        );
      }
    },
    [dispatch, employeeResponseStatus, history, id, photos]
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
