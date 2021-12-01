import React from "react";
import PropTypes from "prop-types";

const ConfirmInput = React.memo(
  ({
    id,
    name,
    placeholder,
    label,
    value,
    data_required_error,
    data_match_error,
    data_match,
    type,
    onChange,
    readonly,
    required,
    container_class_name,
    control_container_class_name,
    label_class_name
  }) => {
    return (
      <div className={container_class_name}>
        <label htmlFor={id} className={label_class_name}>
          {label}
        </label>

        <div className={control_container_class_name}>
          <input
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            className="form-control"
            data-required-error={data_required_error}
            data-match-error={data_match_error}
            data-match={data_match}
            value={value}
            readOnly={readonly}
            required={required}
            onChange={onChange}
          />
          <span
            className="glyphicon form-control-feedback"
            aria-hidden="true"
          ></span>

          <div className="help-block with-errors"></div>
        </div>
      </div>
    );
  }
);

ConfirmInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  data_required_error: PropTypes.string,
  data_match_error: PropTypes.string.isRequired,
  data_match: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  container_class_name: PropTypes.string.isRequired,
  control_container_class_name: PropTypes.string.isRequired,
  label_class_name: PropTypes.string
};

ConfirmInput.defaultProps = {
  type: "text",
  readonly: false,
  required: false
};

export default ConfirmInput;
