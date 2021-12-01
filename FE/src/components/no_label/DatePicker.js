import React, {useEffect} from "react";
import PropTypes from "prop-types";

const DatePicker = React.memo(
  ({
    id,
    name,
    placeholder,
    value,
    data_required_error,
    type,
    onChange,
    onDateChange, 
    readonly,
    required,
    control_container_class_name
  }) => {
    useEffect(() => {
      // jquery-ui.min.js
      window.datetimepicker(name, value, onDateChange);
    }, []);

    return (
      <div className={control_container_class_name}>
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className="form-control"
          data-required-error={data_required_error}
          value={value}
          readOnly={readonly}
          required={required}
          onChange={onChange}
        />
        {required && (
          <span
            className="glyphicon form-control-feedback"
            aria-hidden="true"
          ></span>
        )}

        {required && <div className="help-block with-errors"></div>}
      </div>
    );
  }
);

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  data_required_error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
  control_container_class_name: PropTypes.string.isRequired
};

DatePicker.defaultProps = {
  type: "text",
  readonly: false,
  required: false
};

export default DatePicker;
