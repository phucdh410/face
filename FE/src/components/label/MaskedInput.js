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
import MaskedInput from "react-text-mask";
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
    "&:focus-within": {
      borderColor: "#558b2f",
      borderWidth: "2px",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(28,31,34, 0.5)",
      borderColor: "rgba(28,31,34, 0.5)",
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
    mask,
    maskChar,
    type,
    placeholder,
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
          <MaskedInput
            id={id}
            name={name}
            placeholder={placeholder}
            mask={mask}
            guide
            placeholderChar={maskChar}
            value={value}
            disabled={disabled}
            onChange={onChange}
            render={(ref, props) => (
              <TextField
                id={id}
                name={name}
                type={type}
                className={classes.root}
                inputRef={ref}
                variant={variant}
                inputProps={{
                  autoComplete: "off",
                  readOnly,
                }}
                fullWidth
                error={error}
                size={size}
                required={required}
                {...props}
              />
            )}
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
  mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  maskChar: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
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
  maskChar: "_",
  type: "text",
  placeholder: "",
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
