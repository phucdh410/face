import axios from "axios";
import jwtDecode from "jwt-decode";
import { isEmpty } from "lodash";
import moment from "moment";

// import { logoutUser } from "../actions/auth.actions";
// import { clearCurrentProfile } from "../actions/profile.actions";

export const convertDateToMiliseconds = (date) => {
  const milliseconds = date.getTime();
  return milliseconds;
};

export const convertMilisecondsToDate = (milliseconds) => {
  const date = new Date(milliseconds);
  return date;
};

export const convertStringToDate = (input) => {
  if (!isEmpty(input)) {
    const arr = input.split("-");

    const day = parseInt(arr[0], 0);
    const month = parseInt(arr[1], 0);
    const year = parseInt(arr[2], 0);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      const date = `${year}-${month}-${day}`;
      return date;
    }
  }

  return null;
};

export const convertDateToString = (date, format = "DD-MM-YYYY") => moment(date).format(format);

export const isValidDate = (date, format = "YYYY-MM-DD") => moment(date, format, true).isValid();

export const makeDate = (day, month, year, format) => {
  if (day !== 0 && month !== 0 && year !== 0) {
    const date = `${year}-${month}-${day}`;
    return moment(new Date(date)).format(format);
  } return null;
};

export const getBoolean = (value) => {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
};

export const getTime = (input) => {
  const now = new Date();
  const date = moment(input).toDate();

  const diff = Math.abs(now - date);

  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 60) return `${minutes} phút trước`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;

  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
};

export const getPermission = (permissions, input) => {
  const items = permissions.filter((item) => item.permission === input);
  return !!(items && items.length > 0);
};

export const getView = (permissions, input) => {
  const items = permissions.filter((item) => item.permission === input);

  if (items && items.length > 0) {
    const item = items[0];
    if (item.view === true || item.view === "true") {
      return true;
    }
    return false;
  }
  return false;
};

export const getAdd = (permissions, input) => {
  const items = permissions.filter((item) => item.permission === input);

  if (items && items.length > 0) {
    const item = items[0];
    if (item.add === true || item.add === "true") {
      return true;
    }
    return false;
  }
  return false;
};

export const getEdit = (permissions, input) => {
  const items = permissions.filter((item) => item.permission === input);

  if (items && items.length > 0) {
    const item = items[0];
    if (item.edit === true || item.edit === "true") {
      return true;
    }
    return false;
  }
  return false;
};

export const getDelete = (permissions, input) => {
  const items = permissions.filter((item) => item.permission === input);

  if (items && items.length > 0) {
    const item = items[0];
    if (item.del === true || item.del === "true") {
      return true;
    }
    return false;
  }
  return false;
};

export const getExport = (permissions, input) => {
  const items = permissions.filter((item) => item.permission === input);

  if (items && items.length > 0) {
    const item = items[0];
    if (item.export === true || item.export === "true") {
      return true;
    }
    return false;
  }
  return false;
};

export const isExpired = (token) => {
  // Decode token & get user info and exp
  const decoded = jwtDecode(token);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) return true;
  return false;
};

export const setHttpConfig = async (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.Authorization;
  }
};

export const greet = (message) => {
  // eslint-disable-next-line no-undef
  if (responsiveVoice) {
    // eslint-disable-next-line no-undef
    responsiveVoice.speak(message, "Vietnamese Female");
  }
};

export const permissionFns = {
  getPermission,
  getView,
  getAdd,
  getEdit,
  getDelete,
  getExport,
  isExpired,
  setHttpConfig,
};
