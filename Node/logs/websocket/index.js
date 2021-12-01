const moment = require("moment");
const utils = require("../../utilities");

const now = moment(Date.now()).format("YYYYMMDD");
log = now + ".lg";
const path = "./logs/" + log;

const on_camera_connected_success_log = (params) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[WEBSOCKET] - CAMERA_CONNECTED\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_connected_error_log = (params, errors) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[ERROR] - CAMERA_CONNECTED\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "errors: " + errors + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_connecting_success_log = (params) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[WEBSOCKET] - CAMERA_CONNECTING\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_connecting_error_log = (params, errors) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[ERROR] - CAMERA_CONNECTING\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "errors: " + errors + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_disconnected_success_log = (params) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[WEBSOCKET] - CAMERA_DISCONNECTED\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_disconnected_error_log = (params, errors) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[ERROR] - CAMERA_DISCONNECTED\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "errors: " + errors + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_recognize_success_log = (params) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[WEBSOCKET] - CAMERA_RECOGNIZE\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

const on_camera_recognize_error_log = (params, errors) => {
  var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  utils.writeFile(path, "[ERROR] - CAMERA_RECOGNIZE\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "params: " + JSON.stringify(params) + "\n");
  utils.writeFile(path, "errors: " + errors + "\n");
  utils.writeFile(path, "time: " + current + "\n");
  utils.writeFile(path, "-------------------------------------------\n");
  utils.writeFile(path, "[END]\n");
  utils.writeFile(path, "\n");
};

module.exports = {
  on_camera_connected_success_log,
  on_camera_connected_error_log,
  on_camera_connecting_success_log,
  on_camera_connecting_error_log,
  on_camera_disconnected_success_log, 
  on_camera_disconnected_error_log,
  on_camera_recognize_success_log,
  on_camera_recognize_error_log,
};
