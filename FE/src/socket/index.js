import { io } from "socket.io-client";
import { CAMERA_CONNECTED, CAMERA_DISCONNECTED } from "./constants";

var socket;

export const onDeviceConnected = function (data) {
  console.log("Device has connected!");
};

export const onDeviceDisconnect = function (data) {
  console.log("Device has disconnected!");
};

export const onConnected = function (data) {
  if (socket) {
    if (socket.connected) {
      console.log("Client has connected!");

      socket.on(CAMERA_CONNECTED, onDeviceConnected);
      socket.on(CAMERA_DISCONNECTED, onDeviceDisconnect);
    }
  }
};

export const onConnectError = function (err) {
  console.log("Client connect occurred error: ", err.message);
  socket.connect();
};

export const onConnectTimeout = function (timeout) {
  console.log("Client connect timeout: ", timeout);
  socket.connect();
};

export const onDisconnect = function (reason) {
  console.log("Client has disconnected!");

  socket.off(CAMERA_CONNECTED, onDeviceConnected);
  socket.off(CAMERA_DISCONNECTED, onDeviceDisconnect);

  socket.connect();
};

export const getSocket = url => {
  socket = io.connect(url);

  if (socket) {
    socket.on("connect", onConnected);

    socket.on("connect_error", onConnectError);

    socket.on("error", onConnectError);

    socket.on("connect_timeout", onConnectTimeout);

    socket.on("disconnect", onDisconnect);
  }

  return socket;
};
