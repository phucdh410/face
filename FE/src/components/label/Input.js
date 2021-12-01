import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormControl,
  FormHelperText,
  Input as TextField,
  InputLabel,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    borderColor: "#1c1f22",
    backgroundColor: "#1c1f22",
    borderRadius: "3px",
    boxShadow: "none",
    height: "36px",
    border: "1px solid #e4e5e7",
    display: "block",
    width: "100%",
    padding: "6px 12px",
    fontSize: "14px",
    lineHeight: 1.42857143,
    backgroundImage: "none",
    transition: "border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s",
    "&:before": {
      borderBottom: "none",
      content: "none",
    },
    "&:after": {
      content: "none",
    },
    "& input:-webkit-autofill,input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active": {
      transition: "background-color 5000s ease-in-out 0s",
      "-webkit-text-fill-color": "#999 !important",
    },
    /* Chrome, Safari, Edge, Opera */
    "& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    /* Firefox */
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "&:focus-within": {
      borderColor: "#558b2f",
      borderWidth: "2px",
      boxShadow: "none",
    },
    "&:hover": {
      borderColor: "#558b2f",
      borderWidth: "2px",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(28,31,34, 0.5)",
      borderColor: "rgba(28,31,34, 0.5)",
      pointerEvents: "none",
    },
    "&.Mui-error": {
      borderColor: "#e5343d",
      borderWidth: "2px",
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

const Input = React.memo(
  ({
    id,
    name,
    label,
    type,
    placeholder,
    pattern,
    value,
    variant,
    onChange,
    size,
    disabled,
    error,
    displayError,
    helperText,
    readOnly,
    required,
    containerClass,
    controlContainerClass,
    labelClass,
  }) => {
    const classes = useStyles();
    const theme = useTheme();

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
          <TextField
            id={id}
            name={name}
            type={type}
            className={classes.root}
            placeholder={placeholder}
            value={value}
            variant={variant}
            inputProps={{
              disabled,
              readOnly,
              pattern,
            }}
            fullWidth
            error={error}
            size={size}
            disabled={disabled}
            required={required}
            onChange={onChange}
          />

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
  },
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  displayError: PropTypes.bool,
  helperText: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  containerClass: PropTypes.string.isRequired,
  controlContainerClass: PropTypes.string.isRequired,
  labelClass: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  pattern: null,
  value: "",
  variant: "outlined",
  size: "small",
  disabled: false,
  error: false,
  displayError: false,
  helperText: "",
  readOnly: false,
  required: false,
  labelClass: "",
};

export default Input;
