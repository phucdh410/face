import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { makeStyles } from "@mui/styles";

import viLocale from "date-fns/locale/vi";

import { convertDateToString, convertStringToDate } from "../../utils";

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
    "&:hover": {
      borderColor: "#558b2f",
      borderWidth: "2px",
      boxShadow: "none",
    },
    "& .MuiOutlinedInput-root": {
      font: "inherit",

      "& .MuiInputBase-input": {
        fontSize: "inherit",
        padding: 0,
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    " & .MuiSvgIcon-root": {
      display: "none",
    },
  },
});

const DateControl = React.memo(
  ({
    id,
    name,
    type,
    placeholder,
    mask,
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

    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(value ? new Date(convertStringToDate(value)) : new Date());

    return (
      <Box className={controlContainerClass}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={viLocale}>
          <DatePicker
            mask={mask}
            value={date}
            open={open}
            disabled={disabled}
            required={required}
            onClose={() => setOpen(false)}
            onChange={(value) => {
              console.log("value: ", value);
              setDate(value);
              onChange(name, value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                className={classes.root}
                value={convertDateToString(date)}
                variant={variant}
                inputProps={{
                  readOnly,
                }}
                fullWidth
                size={size}
                disabled={disabled}
                required={required}
                onClick={() => setOpen(true)}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
    );
  },
);

DateControl.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  mask: PropTypes.string,
  value: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  controlContainerClass: PropTypes.string.isRequired,
};

DateControl.defaultProps = {
  type: "text",
  placeholder: "",
  mask: "__/__/____",
  variant: "outlined",
  size: "small",
  disabled: false,
  readOnly: true,
  required: false,
};

export default DateControl;
