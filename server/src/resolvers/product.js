const { ProductModel } = require('../models');

const Query = {
  listProducts: async (_, { limit, page }) => {
    return ProductModel.find({})
      .skip((page - 1) * limit)
      .limit(limit);
  },
  getProduct: async (_, { id }) => {
    return ProductModel.findById(id);
  },
};

const Mutation = {
  addProduct: async (_, args) => {
    const product = new ProductModel(args);
    return product.save();
  },
  updateProduct: async (_, { id, name, description, quantity, status }) => {
    const $set = {};
    if (name) $set.name = name;
    if (description) $set.description = description;
    if (quantity) $set.quantity = quantity;
    if (status) $set.status = status;

    return ProductModel.findByIdAndUpdate(id, { $set }, { new: true });
  },
};

module.exports = {
  Query,
  Mutation,
};
