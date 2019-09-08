const express = require('express');
const Boom = require('boom');
const morgan = require('morgan');
const glob = require('glob');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const app = express();

async function start() {
  app.use(cors());

  // Enable api usage logging
  if (config.dev) {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('short'));
  }

  // Enable parsers with larger payloads
  app.use(express.json({ limit: '25mb', type: 'application/json' }));

  // Connect to MongoDB
  mongoose.connect(config.db, {
    config: { autoIndex: true },
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on('error', () => {
    throw new Error(`Unable to connect to database at ${config.db}`);
  });

  // Load Mongoose Models
  const models = glob.sync(`${config.path}/**/*Model.js`);
  models.forEach(modelPath => {
    require(`${modelPath}`);
  });

  // Load APIs
  const apis = glob.sync(`${config.path}/**/*Api.js`);
  apis.forEach(apiPath => {
    require(`${apiPath}`)(app);
  });

  // Error handling
  //eslint-disable-next-line
  app.use((err, req, res, next) => {
    const error = Boom.isBoom(err) ? err : Boom.boomify(err);
    res
      .status(error.output.statusCode)
      .json({ message: error.message, error: error.output.payload.error });
  });

  // Listen the server
  app.listen(config.port, config.host);
}

start();
module.exports = app;
