const { UserModel } = require('../models');

const Mutation = {
  addUser: async (_, args) => {
    const user = new UserModel(args);
    return user.save();
  },
};

module.exports = { Mutation };
