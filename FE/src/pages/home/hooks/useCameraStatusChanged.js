import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setCameras } from "../../../actions/camera.actions";

const useCameraStatusChanged = (cameras) => {
  const dispatch = useDispatch();
  const onCameraStatusChanged = useCallback(
    async (payload) => {
      const { camera_id: _id, connected } = payload;
      dispatch(
        setCameras(
          cameras.map((camera) => {
            camera.id === _id ? { ...camera, status: connected } : camera;
          })
        )
      );
    },
    [cameras, dispatch]
  );

  return onCameraStatusChanged;
};

export default useCameraStatusChanged;
