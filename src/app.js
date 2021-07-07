require('./bootstrap');

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
class AppController {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(express.static(`${process.cwd()}/static/`));
    this.server.use(cors());
    this.server.disable('x-powered-by');
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new AppController().server;
