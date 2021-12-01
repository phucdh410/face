import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  label: {
    float: "left",
    fontWeight: "normal",
  },
  root: {
    backgroundColor: "#1c1f22",
    borderRadius: "3px",
    boxShadow: "none",
    height: "36px",
    display: "block",
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
    "&:hover": {
      "& > .MuiOutlinedInput-notchedOutline": {
        borderColor: "#558b2f",
        borderWidth: "2px",
      },
    },
  },
});

const List = React.memo((props) => {
  const {
    id,
    name,
    placeholder,
    data,
    defaultValue,
    value,
    onChange,
    renderItems,
    error,
    message,
    disabled,
    multiple,
    controlContainerClass,
  } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    if (currentValue !== value) setCurrentValue(value);
  }, [value]);

  return (
    <Box className={controlContainerClass}>
      <Select
        id={id}
        name={name}
        inputProps={{
          "aria-label": "Without label",
        }}
        displayEmpty
        className={classes.root}
        disabled={disabled}
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

      {error && <FormHelperText>{message}</FormHelperText>}
    </Box>
  );
});

List.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  renderItems: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  multiple: PropTypes.bool,
  controlContainerClass: PropTypes.string.isRequired,
};

List.defaultProps = {
  defaultValue: "",
  data: [],
  disabled: false,
  error: false,
  message: "",
  multiple: false,
};

export default List;
