const express = require('express');
const http = require('http');
const status = require('http-status');
const routes = require('./routes/routes');
const sequelize = require('./database/database');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use((request, response) => {
  response.status(status.NOT_FOUND).send();
});

app.use((error, request, response) => {
  response.status(status.INTERNAL_SERVER_ERROR).json({ error });
});

sequelize.sync({ force: true }).then(() => {
  const port = process.env.PORT || 3000;

  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port);
});
