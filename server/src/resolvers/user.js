const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');
const { UserModel } = require('../models');
const jsonWebToken = require('jsonwebtoken');
const { jwt } = require('../config');

const Query = {
  login: async (_, { login, password }) => {
    const user = await UserModel.findOne({ login });

    if (!user) throw new UserInputError('Login not found :( ');
    const isValid = await user.validatePassword({ password });

    if (!isValid) throw new AuthenticationError('Invalid password.');

    return jsonWebToken.sign({ user }, jwt.secret, {
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
