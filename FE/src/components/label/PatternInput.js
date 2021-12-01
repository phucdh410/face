import React from "react";
import PropTypes from "prop-types";

const PatternInput = React.memo(
  ({
    id,
    name,
    placeholder,
    label,
    value,
    data_required_error,
    data_pattern_error,
    pattern,
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
            pattern={pattern}
            data-pattern-error={data_pattern_error}
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

PatternInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  data_required_error: PropTypes.string,
  pattern: PropTypes.string.isRequired,
  data_pattern_error: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  container_class_name: PropTypes.string.isRequired,
  control_container_class_name: PropTypes.string.isRequired,
  label_class_name: PropTypes.string
};

PatternInput.defaultProps = {
  type: "text",
  readonly: false,
  required: false
};

export default PatternInput;
