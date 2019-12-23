#!/usr/bin/env node
/* eslint-disable */
/**
 * Module dependencies.
 */
import {} from 'dotenv/config';

import app from '../app';
import debug from 'debug';
import https from 'https';
import socketIO from 'socket.io';
import jwt from 'jsonwebtoken';

import {addMessage, isValidChatUser, getAllMesages} from '../core';
import sslOptions from '../config';

/**
 * Create HTTPS server.
 */
app.set('port', 5000);
let server = https.createServer(sslOptions, app).listen(80);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('User connected');
  socket.broadcast.emit('hi there~');
  socket.on('chat message', (msg) => {
    io.emit('chat message', {
      ...msg,
      timestamp: new Date(),
    });
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('create', function(room) {
    socket.join(room);
  });
});

const chatIO = io.of('/chat');
chatIO.use((socket, next) => {
  if (socket.request.headers.cookie) return next();
  next(new Error('Authentication error'));
});
chatIO.on('connection', (socket) => {
  socket.on('enterRoom', async ({roomId, token}) => {
    let userId = null;
    try {
      const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      userId = payload.id;
    } catch (err) {
      console.error(err);
      return;
    }

    if (await isValidChatUser(roomId, userId)) {
      socket.join(roomId);
      const prevMessages = await getAllMesages(roomId);

      chatIO.to(roomId).emit('prevMessages', prevMessages);
    } else {
      console.error('잘못된 유저 로그인');
      return;
    }
    socket.on('message', async ({userId, content}) => {
      const writtenMsg = await addMessage(roomId, userId, content);
      chatIO.to(roomId).emit('message', writtenMsg);
    });
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

// server.listen(port);
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
