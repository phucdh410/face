import "../styles/custom.css";
import React, { Suspense, lazy, useState } from "react";

import { Box } from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import SuspenseLoading from "../../../components/SuspenseLoading";
import useGoBack from "../../../utils/Hooks/useGoBack";
import useHandleAdd from "../hooks/useHandleAdd";
import useOnDeleteFace from "../hooks/useOnDeleteFace";

const Breadcrum = lazy(() => import("../components/Breadcrum"));
const PanelHeading = lazy(() => import("../components/PanelHeading"));
const Body = lazy(() => import("./components/Body"));

let source = axios.CancelToken.source();

const CreateEmployee = React.memo(() => {
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

  const goBack = useGoBack();

  const onDeleteFace = useOnDeleteFace(
    faces,
    setFaces,
    source,
    faceResponseStatus
  );

  const onSubmit = useHandleAdd(source, errors, photos);

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
