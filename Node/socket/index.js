const moment = require('moment');
const utils = require('../utilities');

const now = moment(Date.now()).format('YYYYMMDD');
const log = now + '.lg';
const path = './lib/log/' + log;

const {
  on_camera_connected_success_log, 
  on_camera_connecting_success_log,
  on_camera_disconnected_success_log,
  on_camera_recognize_success_log,
} = require("../logs/websocket");
const { 
  CAMERA_CONNECTED, 
  CAMERA_CONNECTING,
  CAMERA_DISCONNECTED, 
  CAMERA_RECOGNIZE 
} = require('./constants');

exports.controller = function (socket) {
  socket.on(CAMERA_CONNECTED, payload => {
    var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    console.log("EVENT: CAMERA_CONNECTED");
    console.log("-------------------------------------------\n");
    console.log("payload:" + JSON.stringify(payload));
    console.log("time: " + current);
    console.log("-------------------------------------------\n");

    utils.writeFile(path, "[SOCKET EVENT] - CAMERA_CONNECTED\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "payload: " + payload + "\n");
    utils.writeFile(path, "time: " + current + "\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "[END]\n");
    utils.writeFile(path, "\n");

    const params = {
      camera_id: payload.camera_id, 
    };

    on_camera_connected_success_log(params);
    socket.broadcast.emit(CAMERA_CONNECTED, {camera_id: payload.camera_id, connected: 1});
  });

  socket.on(CAMERA_CONNECTING, payload => {
    var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    console.log("EVENT: CAMERA_CONNECTING");
    console.log("-------------------------------------------\n");
    console.log("payload:" + JSON.stringify(payload));
    console.log("time: " + current);
    console.log("-------------------------------------------\n");

    utils.writeFile(path, "[SOCKET EVENT] - CAMERA_CONNECTING\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "payload: " + payload + "\n");
    utils.writeFile(path, "time: " + current + "\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "[END]\n");
    utils.writeFile(path, "\n");

    const params = {
      camera_id: payload.camera_id, 
    };

    on_camera_connecting_success_log(params);
    socket.broadcast.emit(CAMERA_CONNECTING, {camera_id: payload.camera_id, connected: 2});
  });
  
  socket.on(CAMERA_DISCONNECTED, payload => {
    var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    console.log("EVENT: CAMERA_DISCONNECTED");
    console.log("-------------------------------------------\n");
    console.log("payload:" + JSON.stringify(payload));
    console.log("time: " + current);
    console.log("-------------------------------------------\n");

    utils.writeFile(path, "[SOCKET EVENT] - CAMERA_DISCONNECTED\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "payload: " + payload + "\n");
    utils.writeFile(path, "time: " + current + "\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "[END]\n");
    utils.writeFile(path, "\n");

    const params = {
      camera_id: payload.camera_id
    };

    on_camera_disconnected_success_log(params);
    socket.broadcast.emit(CAMERA_DISCONNECTED, {camera_id: payload.camera_id, connected: 0});
  });
  
  socket.on(CAMERA_RECOGNIZE, payload => {
    var current = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

    console.log("EVENT: CAMERA_RECOGNIZE");
    console.log("-------------------------------------------\n");
    console.log("payload:" + JSON.stringify(payload));
    console.log("time: " + current);
    console.log("-------------------------------------------\n");

    utils.writeFile(path, "[SOCKET EVENT] - CAMERA_RECOGNIZE\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "payload: " + payload + "\n");
    utils.writeFile(path, "time: " + current + "\n");
    utils.writeFile(path, "-------------------------------------------\n");
    utils.writeFile(path, "[END]\n");
    utils.writeFile(path, "\n");

    const params = {
      payload: payload, 
    };

    on_camera_recognize_success_log(params);
    socket.broadcast.emit(CAMERA_RECOGNIZE, payload);
  });
};