const { UserModel } = require('../models');
const jsonWebToken = require('jsonwebtoken');
const { jwt } = require('../config');

const Query = {
  login: async (_, { login, password }) => {
    const token = jsonWebToken.sign({ id: 1 }, jwt.secret, {
      expiresIn: jwt.expiresIn,
    });
  },
};

const Mutation = {
  addUser: async (_, args) => {
    const user = new UserModel(args);
    return user.save();
  },
};

module.exports = { Query, Mutation };
