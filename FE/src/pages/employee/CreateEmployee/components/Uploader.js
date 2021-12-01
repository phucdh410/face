import React, { useCallback } from "react";
import Dropzone from "react-dropzone";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  FACE_R_APP_DOMAIN,
  FACE_R_APP_ALLOWED_EXTENSIONS,
  FACE_R_APP_MAX_CONTENT_LENGTH,
} from "../../../../config";

const Uploader = React.memo(({
  faces,
  photos,
  setPhotos,
  onDeleteFace,
}) => {
  const theme = useTheme();

  const onPhotoDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));

    setPhotos(files);
  }, []);

  const renderFaces = useCallback(() => {
    const thumbs = faces.map((face) => (
      <Box className="thumb" key={face.id}>
        <Box className="thumb-inner">
          <img
            src={`${FACE_R_APP_DOMAIN}/resources/uploads/${face.path}`}
            alt={face.path}
          />
          {!face.loading ? (
            <a
              href="#/"
              className="thumb-close-btn"
              onClick={() => onDeleteFace(face.id)}
            >
              <i className="fa fa-times" aria-hidden="true" />
            </a>
          ) : (
            <Box className="spinner-border thumb-close-btn" role="status">
              <span className="sr-only">Loading...</span>
            </Box>
          )}
        </Box>
      </Box>
    ));

    return thumbs;
  }, [faces, onDeleteFace]);

  const renderPhotos = useCallback(() => {
    const thumbs = photos.map((file) => (
      <Box className="thumb" key={file.name}>
        <Box className="thumb-inner">
          <img src={file.preview} alt={file.name} />
        </Box>
      </Box>
    ));

    return thumbs;
  }, [photos]);

  return (
    <Box className="row" marginTop={24}>
      <Box className="col-md-12">
        {renderFaces()}
        {renderPhotos()}

        <Dropzone
          accept={FACE_R_APP_ALLOWED_EXTENSIONS}
          maxSize={FACE_R_APP_MAX_CONTENT_LENGTH}
          multiple
          onDrop={onPhotoDrop}
        >
          {({ getRootProps, getInputProps }) => (
            <Box className="add-thumb">
              <Box
                {...getRootProps({
                  className: "dropzone text-center",
                })}
              >
                <input {...getInputProps()} />
                <span className="icon-asset material-icons ng-star-inserted">
                  add_a_photo
                </span>

                <Typography
                  variant="h6"
                  color={theme.palette.text.primary}
                  component="p"
                >
                  Chọn hình ảnh chỉ chưa khuôn mặt của nhân viên
                </Typography>
              </Box>
            </Box>
          )}
        </Dropzone>
      </Box>
    </Box>
  );
});

Uploader.displayName = "Uploader";

export default Uploader;
