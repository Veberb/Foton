const path = require('path');

const env = process.env.NODE_ENV;
const dev = env === 'development';
const staging = env === 'staging';
const production = env === 'production';

const DEFAULT_ENV_CONFIG = {
  // database
  db: process.env.MONGO_PATH || 'mongodb://localhost:27017/foton',

  // app serving on
  host: process.env.HOST || '10.0.0.104',
  port: process.env.PORT || 8000,

  // env
  env,
  dev,
  staging,
  production,

  // app path
  path: path.normalize(`${__dirname}/..`),

  //jwt
  jwt: {
    secret: 'TrailerParkBoys',
    expiresIn: 86400,
  },
};

module.exports = Object.assign({}, DEFAULT_ENV_CONFIG);
