#!/usr/bin/env node
/* eslint-disable */
/**
 * Module dependencies.
 */
import {} from 'dotenv/config';

import app from '../app';
import debug from 'debug';
import http from 'http';
import socketIO from 'socket.io';

import {addMessage, isValidChatUser, getAllMesages} from '../core';
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const io = socketIO(server);

io.use(function(socket, next) {
  var handshakeData = socket.request;
  // check JSON token for AuthN
  next();
});

io.use(function(socket, next) {
  var handshakeData = socket.request;
  // check JSON token for AuthZ
  // get userID from AuthZ
  // get accessing roomId
  // Chat.findById(roomId)
  // if(seller ===userID||buyer||userID)
  // next()
  // else next('err')
  next();
});
const chatIO = io.of('/chat');
chatIO.on('connection', (socket) => {
  console.log('chat방 입장1');

  socket.on('enterRoom', async (roomId) => {
    console.log(`방 =>${roomId}입장`);
    // 여기서 check valid uuid 확인해보면 좋을듯
    // 인증 작업은 다음 확인 https://stackoverflow.com/a/36821359/5755608
    // 현재는 임시 유저 1번으로 사용중, 추후 JWT 사용시 가져올 예정
    const tmpUser = 1;
    if (await isValidChatUser(roomId, tmpUser)) {
      socket.join(roomId);
      const prevMessages = await getAllMesages(roomId);

      chatIO.to(roomId).emit('prevMessages', prevMessages);
    } else {
      console.log('잘못된 유저 로그인');
      return;
    }
    socket.on('message', async ({userId, content}) => {
      console.log('message', userId, content);
      const writtenMsg = await addMessage(roomId, userId, content);
      chatIO.to(roomId).emit('message', writtenMsg);
    });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('template:server')('Listening on ' + bind);
}
