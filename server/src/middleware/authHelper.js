const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = ({ req, token }) => {
  jwt.verify(token, config.jwt.secret, function(err, decoded) {
    req.authUser = decoded;
  });
};

const authenticated = next => (root, args, context, info) => {
  if (!context.authUser) {
    throw new Error(`Sorry, not authenticated :((!`);
  }

  return next(root, args, context, info);
};

module.exports = { verifyToken, authenticated };
