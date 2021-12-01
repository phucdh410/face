import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Select = React.memo(props => {
  const {
    id,
    name,
    placeholder,
    label,
    default_value,
    default_message,
    data,
    data_required_error,
    value,
    onChange,
    renderOptions,
    disabled,
    required,
    multiple,
    parent,
    container_class_name,
    control_container_class_name,
    label_class_name,
    data_minimum_results_for_search
  } = props;

  useEffect(() => {
    // Select2.js
    window.select(id, parent);
    window.onChange(id, onChange);
  }, [id, onChange, parent]);

  let currentValue = value || default_value;

  return (
    <div className={container_class_name}>
      {label && (
        <label htmlFor={id} className={label_class_name}>
          {label}
        </label>
      )}

      <div className={control_container_class_name}>
        <select
          id={id}
          name={name}
          data-placeholder={placeholder}
          data-error={data_required_error}
          value={currentValue}
          disabled={disabled}
          required={required}
          multiple={multiple}
          data-minimum-results-for-search={data_minimum_results_for_search}
          onChange={onChange}
        >
          {default_message && (
            <option value={default_value} data-tokens={default_value}>
              {default_message}
            </option>
          )}

          {data && data.length > 0 && renderOptions(data)}
        </select>
        {required && (
          <span
            className="glyphicon form-control-feedback"
            aria-hidden="true"
          ></span>
        )}

        {required && <div className="help-block with-errors"></div>}
      </div>
    </div>
  );
});

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  default_value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  default_message: PropTypes.string,
  data: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data_required_error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  renderOptions: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  container_class_name: PropTypes.string.isRequired,
  control_container_class_name: PropTypes.string.isRequired,
  label_class_name: PropTypes.string,
  data_minimum_results_for_search: PropTypes.string
};

Select.defaultProps = {
  data: [],
  disabled: false,
  required: false,
  multiple: false
};

export default Select;
