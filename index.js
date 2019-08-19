const express = require('express');
const next = require('next');
const morgan = require('morgan');
const registerRoutes = require('./routes');

const server = express();
server.use(morgan('dev'));
const DEV = process.env.NODE_ENV === 'development';
const app = next({ dev: DEV });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  registerRoutes(server, handle);
  server.listen(process.env.PORT || 3000);
});

module.exports = server;
