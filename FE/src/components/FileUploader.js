import React from "react";
import PropTypes from "prop-types";

import { getConfig } from "../../config";
import ConfigType from "../../config/types";

const FACE_R_APP_UPLOAD_FILE_API = getConfig(
  ConfigType.FACE_R_APP_UPLOAD_FILE_API
);

class FileUploader extends React.Component {
  componentDidMount() {
    const uploader = window.dropzone(
      "#uploader",
      FACE_R_APP_UPLOAD_FILE_API,
      this.props.onChange
    );

    this.props.setUploader(uploader);
  }

  render() {
    const { url } = this.state;
    const { error, info } = this.props;

    return (
      <div className="form-group col-sm-12">
        <form
          id="uploader"
          action={url}
          className="dropzone"
          method="post"
          encType="multipart/form-data"
        >
          {info && <span className="help-block small">{info}</span>}
          {error && <div className="invalid-feedback">{error}</div>}
        </form>
      </div>
    );
  }
}

FileUploader.propTypes = {
  id: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

FileUploader.defaultProps = {
  data: [],
  multiple: false
};

export default FileUploader;
