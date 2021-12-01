//SocketIO NodeJS Group Chat Implementation Test
//Coded/Developed By Aravind.V.S
//www.aravindvs.com

// Modules
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

const app = express();
const synccall = require('./socket');

const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    credentials: true
  }
});

process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type, Authorization, Cache-Control"],
}));

// Change service config file C:\Program Files\MongoDB\Server\4.0\bin\mongod.cfg
// # network interfaces (wjp: comment bindIp listening on all IPs)
// net:
//   port: 27017
// #  bindIp: 127.0.0.1
//   bindIp: 0.0.0.0
// restart mongodb service (or restart computer);
// make sure machine level firewall open port 27017
// connect ok.

// Models
global.project_dir_name = path.resolve(__dirname);
global.app = app;

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/lib/log/access.log', {flags: 'a'});

// setup the logger
app.use(morgan('combined', {stream: accessLogStream}));

// use Static
app.use(express.static('logs'));

const PORT = process.env.PORT || 5002;

server.listen(PORT, err => {
  if(err) console.log(`Error: ${err.message}`);
	else console.log(`Http server is listening on port ${PORT}`);
});

// ======================== Socket IO ==========================
global.io = io.sockets.on('connection', function (socket) {
  console.log('@ Client connected: ', socket.id);

  synccall.controller(socket);

  socket.on('disconnect', function () {
    console.log('@ Client disconnect: ', socket.id);
  });
})