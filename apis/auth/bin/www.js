#!/usr/bin/env node
/* eslint-disable */
/**
 * Module dependencies.
 */
require('dotenv').config();
var app = require('../app');
var httpsApp = require('../app_HTTPS');
var debug = require('debug')('template:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

// Listen on provided port, on all network interfaces.

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync(
      '/etc/letsencrypt/live/auth.oemarket.shop/privkey.pem',
    ),
    cert: fs.readFileSync('/etc/letsencrypt/live/auth.oemarket.shop/cert.pem'),
  };
  const httpsServer = https.createServer(options, httpsApp);
  httpsServer.listen(443);
  httpsServer.on('error', onError);
  httpsServer.on('listening', onListening);
}

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
  debug('Listening on ' + bind);
}
