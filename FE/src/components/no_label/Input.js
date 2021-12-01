import React from "react";
import PropTypes from "prop-types";
import { Box, Input as TextField } from "@mui/material";
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
  },
});

const Input = React.memo(
  ({
    id,
    name,
    type,
    placeholder,
    value,
    variant,
    onChange,
    size,
    disabled,
    readOnly,
    required,
    controlContainerClass,
  }) => {
    const classes = useStyles();

    return (
      <Box className={controlContainerClass}>
        <TextField
          id={id}
          name={name}
          type={type}
          className={classes.root}
          placeholder={placeholder}
          value={value}
          variant={variant}
          inputProps={{
            autoComplete: "off",
            readOnly,
          }}
          fullWidth
          size={size}
          disabled={disabled}
          required={required}
          onChange={onChange}
        />
      </Box>
    );
  },
);

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  controlContainerClass: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  value: "",
  variant: "outlined",
  size: "small",
  disabled: false,
  readOnly: false,
  required: false,
};

export default Input;
