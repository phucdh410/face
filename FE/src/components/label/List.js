import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#1c1f22",
    borderRadius: "3px",
    boxShadow: "none",
    height: "36px",
    width: "100%",
    fontSize: "14px",
    backgroundImage: "none",
    transition: "border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s",
    "& > .MuiOutlinedInput-notchedOutline": {
      borderWidth: "0px",
    },
    "& > .MuiSelect-outlined": {
      minHeight: 0,
      padding: "7px 12px",
    },
    "&.Mui-focused": {
      "& > .MuiOutlinedInput-notchedOutline": {
        borderColor: "#558b2f",
        borderWidth: "2px",
      },
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(28,31,34, 0.5)",
    },
    "&.Mui-error": {
      "& > .MuiOutlinedInput-notchedOutline": {
        borderColor: "#e5343d",
        borderWidth: "2px",
      },
    },
    "&:hover": {
      "& > .MuiOutlinedInput-notchedOutline": {
        borderColor: "#558b2f",
        borderWidth: "2px",
      },
    },
  },
  label: {
    float: "left",
    fontWeight: "normal",
  },
  message: {
    marginLeft: 0,
  },
});

const List = React.memo((props) => {
  const {
    id,
    name,
    label,
    placeholder,
    data,
    defaultValue,
    value,
    onChange,
    renderItems,
    disabled,
    error,
    displayError,
    helperText,
    multiple,
    containerClass,
    controlContainerClass,
    labelClass,
  } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    if (currentValue !== value) setCurrentValue(value);
  }, [value]);

  return (
    <Box className={containerClass}>
      <Box className={labelClass}>
        <InputLabel htmlFor={id} className={classes.label}>
          <Typography
            variant="h5"
            color={theme.palette.text.primary}
          >
            {label}
          </Typography>
        </InputLabel>
      </Box>

      <FormControl className={controlContainerClass}>
        <Select
          id={id}
          name={name}
          inputProps={{
            "aria-label": "Without label",
          }}
          displayEmpty
          className={classes.root}
          disabled={disabled}
          error={error}
          value={currentValue}
          multiple={multiple}
          onChange={onChange}
        >
          {placeholder && (
          <MenuItem value={defaultValue}>
            <Typography
              variant="h5"
              color={theme.palette.text.primary}
            >
              {placeholder}
            </Typography>
          </MenuItem>
          )}
          {data && renderItems(data, theme)}
        </Select>

        {error && displayError && (
          <FormHelperText error={error} className={classes.message}>
            <Typography
              variant="h5"
              color={theme.palette.error.main}
            >
              {helperText}
            </Typography>
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
});

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  renderItems: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  displayError: PropTypes.bool,
  helperText: PropTypes.string,
  multiple: PropTypes.bool,
  containerClass: PropTypes.string.isRequired,
  controlContainerClass: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
};

List.defaultProps = {
  defaultValue: "",
  data: [],
  disabled: false,
  error: false,
  displayError: false,
  helperText: "",
  multiple: false,
  labelClass: "",
};

export default List;
