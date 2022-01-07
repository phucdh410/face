import "../styles/custom.css";
import React, {
  Suspense,
  lazy,
  useEffect,
  useCallback,
  useState,
  useContext,
} from "react";

import { Box } from "@mui/material";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import axios from "axios";

import { addEmployee } from "../../../actions/employee.actions";
import { convertStringToDate, isValidDate } from "../../../utils";
import { FACE_R_APP_TITLE } from "../../../config";
import { LoadingContext } from "../../../context/LoadingContext";
import removeFace from "../../../actions/face.actions";
import SuspenseLoading from "../../../components/SuspenseLoading";
import { PopupContext } from "../../../context/PopupContext";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));

const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateEmployee = React.memo(() => {
  const { setLoading } = useContext(LoadingContext);
  const { setShowPopup, setInfo } = useContext(PopupContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector(
    (state) => ({
      stores: state.root.stores,
      uploadErrors: state.root.upload_file_errors,
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

  const [photos, setPhotos] = useState([]);
  const [faces, setFaces] = useState([]);

  const handlePopup = (title, message, expired, type, func) => {
    setInfo({
      title,
      message,
      expired,
      type,
    });
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      if (typeof func === "function") {
        func();
      }
    }, expired * 1.5);
    clearTimeout();
  };

  const goBack = useCallback(
    (e) => {
      e.preventDefault();
      history.goBack();
    },
    [history]
  );

  const onDeleteFace = useCallback(
    async (_id) => {
      const index = faces.findIndex((face) => face.id === _id);
      faces[index].loading = true;

      setFaces(faces);

      await dispatch(removeFace(_id, source.token, history));

      if (faceResponseStatus) faces.splice(index, 1);
      else faces[index].loading = false;

      setFaces(faces);
    },
    [dispatch, faceResponseStatus, history]
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

        setLoading(true);
        await dispatch(
          addEmployee(params, source.token, history, errors, (_success) => {
            if (_success) {
              let message = "Lưu thông tin nhân viên thành công!";
              const errors = uploadErrors || [];

              if (errors.length > 0) {
                message += "\r\n Upload files xảy ra sự cố, vui lòng thử lại.";
              }

              handlePopup(FACE_R_APP_TITLE, message, 2000, "success", () => {
                history.replace("/employees");
                setLoading(false);
              });
            } else {
              handlePopup(
                FACE_R_APP_TITLE,
                errors.message,
                2000,
                "error",
                () => {
                  setLoading(false);
                }
              );
            }
          })
        );
      } else {
        handlePopup(
          FACE_R_APP_TITLE,
          "Định dạng ngày sinh không hợp lệ!",
          4000,
          "warning",
          () => {
            setLoading(false);
          }
        );
      }
    },
    [dispatch, employeeResponseStatus, history, photos, uploadErrors]
  );

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <Breadcrum />

      <Box className="row">
        <Box className="col-md-12">
          <Box className="panel panel-bd lobidrag">
            <PanelHeading />

            <Body
              faces={faces}
              photos={photos}
              stores={stores}
              goBack={goBack}
              setPhotos={setPhotos}
              onDeleteFace={onDeleteFace}
              onSubmit={onSubmit}
            />
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
});

export default withRouter(CreateEmployee);
