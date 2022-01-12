import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import removeFace from "../../../actions/face.actions";

const useOnDeleteFace = (faces, setFaces, source, faceResponseStatus) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onDeleteFace = useCallback(
    async (faceId) => {
      const index = faces.findIndex((face) => face.id === faceId);
      faces[index].loading = true;
      setFaces(faces);

      await dispatch(removeFace(faceId, source.token, history));

      if (faceResponseStatus) faces.splice(index, 1);
      else faces[index].loading = false;
      setFaces(faces);
    },
    [dispatch, faceResponseStatus, history]
  );

  return onDeleteFace;
};

export default useOnDeleteFace;
