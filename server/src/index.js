const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers');
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
  const server = new ApolloServer({ typeDefs: schema, resolvers });
  server.applyMiddleware({ app });

  // Listen the server
  app.listen(config.port, config.host);
}

start();
module.exports = app;
